/**
 * Data Model Interfaces
 */

import { Item, ItemModel } from "./item.interface";
import { Items } from "./items.interface";
import { ItemRepository } from "./item.repository";

/**
 * In-Memory Store
 

const items: Items = {
  1: {
    id: 1,
    name: "Burger",
    price: 5.99,
    description: "Tasty",
    image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png",
  },
  2: {
    id: 2,
    name: "Pizza",
    price: 2.99,
    description: "Cheesy",
    image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png",
  },
  3: {
    id: 3,
    name: "Tea",
    price: 1.99,
    description: "Informative",
    image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png",
  },
};
*/
export class ItemService {
  private itemRepository: ItemRepository;

  constructor(itemRepository: ItemRepository) {
    this.itemRepository = itemRepository;
  }

  async findAll(): Promise<Items> {
    return this.itemRepository.fetchAll();
  }

  async find(id: number): Promise<Item> {
    // const record: Item = items[id];

    // if (record) {
    //   return record;
    // }

    throw new Error("No item found");
  }

  async create(newItem: Item): Promise<Item | null> {
    return this.itemRepository.create(newItem);
  }

  async update(updatedItem: Item): Promise<void> {
    // if (items[updatedItem.id]) {
    //   items[updatedItem.id] = updatedItem;
    //   return;
    // }

    throw new Error("No record found to update");
  }

  async remove(id: number): Promise<void> {
    // const record: Item = items[id];

    // if (record) {
    //   delete items[id];
    //   return;
    // }

    throw new Error("No record found to delete");
  }
}
