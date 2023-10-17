import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Equipment } from './equipment.model';
import { NewEquipmentDto } from './new-equipment.dto';
import { PointDto } from 'src/point/point.model';

@Injectable()
export class EquipmentService {
    constructor(@InjectModel('Equipment') private readonly equipmentModel: Model<Equipment>) {}

    async create(equipment: NewEquipmentDto) {
        if (equipment.points) {
            equipment.points.forEach(point => this.validatePoint(point));
        }
        return await new this.equipmentModel(equipment).save();
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

    async update(id: string, equipment: NewEquipmentDto): Promise<Equipment> {
        if (equipment.points) {
            equipment.points.forEach(point => this.validatePoint(point));
        }
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

    private validatePoint(point: PointDto) {
        switch (point.dataType) {
          case 'boolean':
            if (typeof point.value !== 'boolean') {
              throw new BadRequestException('Value must be a boolean for dataType boolean');
            }
            break;
          case 'number':
            if (typeof point.value !== 'number') {
              throw new BadRequestException('Value must be a number for dataType number');
            }
            break;
          case 'date':
            const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
            if (!dateRegex.test(point.value)) {
              throw new BadRequestException('Value must be a valid date in ISO-8601 format for dataType date');
            }
            break;
          default:
            throw new BadRequestException('Invalid dataType');
        }
    }
}