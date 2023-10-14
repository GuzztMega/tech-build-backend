import * as mongoose from 'mongoose';
import { Point } from '../point.model';

export const PointBooleanSchema = new mongoose.Schema({
    value: { type: Boolean, required: true },
});

export interface PointBoolean extends Point {
    value: boolean;
}