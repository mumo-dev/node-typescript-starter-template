import express from "express";
import helmet from "helmet";
import cors from "cors";
import { Server } from "@overnightjs/core";

import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/notFound.middleware";

import { itemController } from "./items";
import mongoose , { Mongoose } from "mongoose";
import { authController } from "./modules/auth";

export default class AppServer extends Server {
  constructor() {
    super(true);
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.setupControllers();
    this.setupDatabase();

    this.app.use(errorHandler);
    this.app.use(notFoundHandler);
  }
  private setupControllers(): void {
    super.addControllers([itemController, authController]);
  }

  private setupDatabase(): void {
    const mongoDBConnectionUrl = process.env.DB_URL as string;
    mongoose.connect(mongoDBConnectionUrl, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });

  }

  /**** @param {Integer} port - Port which the server will listen.*/
  public start(port: number) {
    return this.app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  }
}
