import { Item, ItemModel } from "./item.interface";

export class ItemRepository {
  
    public async fetchAll(): Promise<Item[]> {
    return await ItemModel.find({});
  }

  public async create(data: Item): Promise<Item | null> {
    return await ItemModel.create(data);
  }
  
}
