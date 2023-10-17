import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PointSchema } from './point.model';
import { PointService } from './point.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Point', schema: PointSchema }]),
  ],
  providers: [PointService],
})
export class PointModule {}
