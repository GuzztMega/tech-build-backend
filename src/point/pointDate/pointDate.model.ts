import * as mongoose from 'mongoose';
import { Point } from '../point.model';

export const PointDateSchema = new mongoose.Schema({
    value: { type: Date, required: true },
});

export interface PointDate extends Point {
    value: Date;
}