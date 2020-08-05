import { Schema, model, Document } from "mongoose";

export interface Item  extends Document{
    // _id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

const ItemSchema = new Schema<Item>({

    name: {
        type: String,
        required: [true, 'Name is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min:[20, 'Minimum price for acceptable is 20']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    }

});


export const ItemModel = model<Item>('Item', ItemSchema);