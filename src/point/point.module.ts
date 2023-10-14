import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PointBooleanSchema } from './pointBoolean/pointBoolean.model';
import { PointDateSchema } from './pointDate/pointDate.model';
import { PointDoubleSchema } from './pointDouble/pointDouble.model';
import { PointNumberSchema } from './pointNumber/pointNumber.model';
import { PointController } from './point.controller';
import { PointSchema } from './point.model';
import { PointService } from './point.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Point', schema: PointSchema },
      { name: 'PointBoolean', schema: PointBooleanSchema },
      { name: 'PointDate', schema: PointDateSchema },
      { name: 'PointDouble', schema: PointDoubleSchema },
      { name: 'PointNumber', schema: PointNumberSchema }
    ]),
  ],
  providers: [PointService],
  controllers: [PointController]
})
export class PointModule {}
