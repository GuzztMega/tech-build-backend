import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export const EquipmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    serialNumber: { type: Number, required: true },
});

export interface Equipment {
    id: string;
    name: string;
    serialNumber: number;
}

export class EquipmentDto {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly serialNumber: string;
}