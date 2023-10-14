import * as mongoose from 'mongoose';
import { Point } from '../point.model';

export const PointNumberSchema = new mongoose.Schema({
    value: { type: Number, required: true },
});

export interface PointNumber extends Point {
    value: number;
}