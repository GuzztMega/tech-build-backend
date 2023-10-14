import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { EquipmentSchema } from './equipment.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Equipment', schema: EquipmentSchema,
    }]),
  ],
  providers: [EquipmentService],
  controllers: [EquipmentController],
})

export class EquipmentModule {}