import { ItemService } from "./items.service";
import { ItemController } from "./items.controller";
import { ItemRepository } from "./item.repository";

const itemRepository = new ItemRepository();
const itemService = new ItemService(itemRepository);
const itemController = new ItemController(itemService);

export {
    itemService,
    itemController
}