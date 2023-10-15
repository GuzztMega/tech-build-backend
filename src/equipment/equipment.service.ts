import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Equipment } from './equipment.model';

@Injectable()
export class EquipmentService {
    constructor(@InjectModel('Equipment') private readonly equipmentModel: Model<Equipment>) {}

    async create(doc: Equipment) {
        return await new this.equipmentModel(doc).save();
    }

    async findAll(): Promise<Equipment[]> {
        return this.equipmentModel.find().exec();
    }

    async findById(id: string): Promise<Equipment> {
        const equipment = await this.equipmentModel.findById(id).exec();
        if (!equipment) {
            throw new NotFoundException('Equipment not found');
        }
        return equipment;
    }

    async update(id: string, equipment: Equipment): Promise<Equipment> {
        const updatedEquipment = await this.equipmentModel.findByIdAndUpdate(id, equipment, { new: true }).exec();
        if (!updatedEquipment) {
            throw new NotFoundException('Equipment not found');
        }
        return updatedEquipment;
    }

    async remove(id: string): Promise<Equipment> {
        const deletedEquipment = await this.equipmentModel.findByIdAndRemove(id).exec();
        if (!deletedEquipment) {
            throw new NotFoundException('Equipment not found');
        }
        return deletedEquipment;
    }
}
