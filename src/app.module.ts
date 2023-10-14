import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PointModule } from './point/point.module';
import { EquipmentModule } from './equipment/equipment.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://guzzmega:YNqDbHos8nkpFoSd@techbuild.bv5bctn.mongodb.net/techbuild?retryWrites=true&w=majority'),
    EquipmentModule,
    PointModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
