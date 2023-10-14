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