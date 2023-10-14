import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Point } from './point.model';

@Injectable()
export class PointService {
    constructor(@InjectModel('Point') private readonly pointModel: Model<Point>) {}

    async findAll(): Promise<Point[]> {
        return this.pointModel.find().exec();
    }

    async findById(id: string): Promise<Point> {
        const point = await this.pointModel.findById(id).exec();
        if (!point) {
            throw new NotFoundException('Point not found');
        }
        return point;
    }

    async create(doc: Point) {
        this.validatePoint(doc);
        const result = await new this.pointModel(doc).save();
        return result.id;
    }
    
    async update(id: string, point: Point): Promise<Point> {
        this.validatePoint(point);
        const updatedPoint = await this.pointModel.findByIdAndUpdate(id, point, { new: true }).exec();
        if (!updatedPoint) {
            throw new NotFoundException('Point not found');
        }
        return updatedPoint;
    }

    async remove(id: string): Promise<Point> {
        const deletedPoint = await this.pointModel.findByIdAndRemove(id).exec();
        if (!deletedPoint) {
            throw new NotFoundException('Point not found');
        }
        return deletedPoint;
    }

    private validatePoint(point: Point) {
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

        if(!point.equipment){
            throw new BadRequestException("Can't save Point without Equipment");
        }
      }

}
