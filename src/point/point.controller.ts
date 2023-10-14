import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { Point } from './point.model';
import { PointService } from './point.service';

@Controller('point')
export class PointController {
  constructor(private service: PointService) {
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
  create(@Body() equipment: Point) {
    return this.service.create(equipment);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() equipment: Point) {
    return this.service.update(id, equipment);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}