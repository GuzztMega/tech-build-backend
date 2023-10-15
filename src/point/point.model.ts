import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Equipment } from 'src/equipment/equipment.model';

export const PointSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dataType: { type: String, required: true },
    value: { type: mongoose.Schema.Types.Mixed },
    equipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipment'
    }
});

export interface Point {
    id: string;
    name: string;
    dataType: string,
    equipmentId: Equipment;
    value: any;
}

export class PointDto {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly dataType: string;
    @ApiProperty()
    readonly value: number | boolean | Date;
    @ApiProperty()
    readonly equipmentId: string;
}