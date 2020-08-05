import { Request, Response, NextFunction } from "express";
import { Controller, Get, Post, Put, Delete } from "@overnightjs/core";
import {
  BAD_REQUEST,
  OK,
  NOT_FOUND,
  CREATED,
  INTERNAL_SERVER_ERROR,
} from "http-status-codes";
import { ItemService } from "./items.service";
import { Items } from "./items.interface";
import { Item, ItemModel } from "./item.interface";
import HttpException, {
  ResourceNotFoundException,
  ValidationException,
} from "../common/http-exception";
import e from "cors";
import { formatMongooseValidationErrors } from "../common/error-formatter";

@Controller("api/items/")
export class ItemController {
  private itemService: ItemService;

  constructor(itemService: ItemService) {
    this.itemService = itemService;
  }

  @Get("")
  private async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const items: Items = await this.itemService.findAll();
      return res.status(OK).send(items);
    } catch (e) {
      next(new HttpException(NOT_FOUND, e.message));
    }
  }

  @Get(":id")
  private async findOne(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id, 10);

    try {
      const item: Item = await this.itemService.find(id);
      return res.status(OK).send(item);
    } catch (e) {
      next(new ResourceNotFoundException(e.message));
    }
  }

  @Post("")
  private async createItem(req: Request, res: Response, next: NextFunction) {
    try {
      const item: Item = req.body.item;
      const error = new ItemModel(item).validateSync();

      if (error) {
        const errors = formatMongooseValidationErrors(error.errors);
        return next(new ValidationException( errors));   
      }

      await this.itemService.create(item);
      return res.sendStatus(CREATED);
    } catch (e) {
      return next(new ResourceNotFoundException(e.message));
    }
  }

  @Put("")
  private async updateItem(req: Request, res: Response, next: NextFunction) {
    try {
      const item: Item = req.body.item;

      await this.itemService.update(item);
      return res.sendStatus(CREATED);
    } catch (e) {
      next(new HttpException(INTERNAL_SERVER_ERROR, e.message));
    }
  }

  @Delete(":id")
  private async deleteItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const id: number = parseInt(req.params.id, 10);
      await this.itemService.remove(id);
      return res.sendStatus(OK);
    } catch (e) {
      next(new HttpException(INTERNAL_SERVER_ERROR, e.message));
    }
  }
}
