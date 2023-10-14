import { Point } from '../point.model';
import * as mongoose from 'mongoose';

export const PointDoubleSchema = new mongoose.Schema({
    value: { type: Number, required: true },
});

export interface PointDouble extends Point {
    value: number;
}