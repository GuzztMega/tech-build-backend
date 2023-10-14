import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { Equipment } from './equipment.model';
import { EquipmentService } from './equipment.service';

@Controller('equipment')
export class EquipmentController {
  constructor(private service: EquipmentService) {
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() equipment: Equipment) {
    return this.service.create(equipment);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() equipment: Equipment) {
    return this.service.update(id, equipment);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}