import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PointNumber } from './pointNumber/pointNumber.model';
import { PointDouble } from './pointDouble/pointDouble.model';
import { PointBoolean } from './pointBoolean/pointBoolean.model';
import { PointDate } from './pointDate/pointDate.model';
import { Point } from './point.model';


@Injectable()
export class PointService {
    constructor(
        @InjectModel('Point') private readonly pointModel: Model<Point>,
        @InjectModel('PointNumber') private readonly pointNumberModel: Model<PointNumber>,
        @InjectModel('PointDouble') private readonly pointDoubleModel: Model<PointDouble>,
        @InjectModel('PointBoolean') private readonly pointBooleanModel: Model<PointBoolean>,
        @InjectModel('PointDate') private readonly pointDateModel: Model<PointDate>) {}

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
        let pointModel;
        switch (doc.dataType) {
            case 'number':
                pointModel = await new this.pointNumberModel(doc).save();
                break;
            case 'decimal':
                pointModel = await new this.pointDoubleModel(doc).save();
                break;
            case 'boolean':
                pointModel = await new this.pointBooleanModel(doc).save();
                break;
            case 'dateTime':
                pointModel = await new this.pointDateModel(doc).save();
                break;
            default:
                throw new Error('Invalid dataType');
        }
        return pointModel.id;
    }

    async update(id: string, point: Point): Promise<Point> {
        console.log('ENTROU AQUI. ID ' + id +  ' POINT: ' + point)

        let pointModel;
        switch (point.dataType) {
            case 'number':
                pointModel = this.pointNumberModel;
                pointModel = await this.pointNumberModel.findByIdAndUpdate(id, pointModel, { new: true }).exec();
                break;
            case 'decimal':
                pointModel = this.pointDoubleModel;
                pointModel = await this.pointDoubleModel.findByIdAndUpdate(id, pointModel, { new: true }).exec();
                break;
            case 'boolean':
                pointModel = this.pointBooleanModel;
                pointModel = await this.pointBooleanModel.findByIdAndUpdate(id, pointModel, { new: true }).exec();
                break;
            case 'dateTime':
                pointModel = this.pointDateModel;
                pointModel = await this.pointDateModel.findByIdAndUpdate(id, pointModel, { new: true }).exec();
                break;
            default:
                throw new Error('Invalid dataType');
        }
        
        if (!pointModel) {
            throw new NotFoundException('Point not found');
        }
        return pointModel;
    }

    async remove(id: string): Promise<Point> {
        const deletedPoint = await this.pointModel.findByIdAndRemove(id).exec();
        if (!deletedPoint) {
            throw new NotFoundException('Point not found');
        }
        return deletedPoint;
    }
}
