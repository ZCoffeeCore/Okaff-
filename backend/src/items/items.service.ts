import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './item.schema';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async create(data: Partial<Item>): Promise<Item> {
    const created = new this.itemModel(data);
    return created.save();
  }
}
