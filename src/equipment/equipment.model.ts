import { Point, PointSchema } from './../point/point.model';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export const EquipmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    serialNumber: { type: Number, required: true },
    points: [PointSchema],
});

export interface Equipment {
    id: string;
    name: string;
    serialNumber: number;
    points: Point[];
}

export class EquipmentDto {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly serialNumber: string;
    @ApiProperty()
    readonly points: Point[];
}