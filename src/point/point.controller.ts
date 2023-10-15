import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Point, PointDto } from './point.model';
import { PointService } from './point.service';

@ApiTags('Point')
@Controller('point')
export class PointController {
  constructor(private service: PointService) {
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a Point by ID' })
  get(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Find all Points' })
  getAll() {
    return this.service.findAll();
  }

  @Post()
  @ApiBody({ type: PointDto })
  @ApiOperation({ summary: 'Create a new Point' })
  create(@Body() equipment: Point) {
    return this.service.create(equipment);
  }

  @Put(':id')
  @ApiBody({ type: PointDto })
  @ApiOperation({ summary: 'Update a Point by ID sending an updated body' })
  update(@Param('id') id: string, @Body() equipment: Point) {
    return this.service.update(id, equipment);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Point by ID' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}