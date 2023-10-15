import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Equipment, EquipmentDto } from './equipment.model';
import { EquipmentService } from './equipment.service';

@ApiTags('Equipment')
@Controller('equipment')
export class EquipmentController {
  constructor(private service: EquipmentService) {
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Find a Equipment by ID' })
  get(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Find all Equipments' })
  getAll() {
    return this.service.findAll();
  }

  @Post()
  @ApiBody({ type: EquipmentDto })
  @ApiOperation({ summary: 'Create a new Equipment' })
  create(@Body() equipment: Equipment) {
    return this.service.create(equipment);
  }

  @Put(':id')
  @ApiBody({ type: EquipmentDto })
  @ApiOperation({ summary: 'Update a Equipment by ID sending an updated body' })
  update(@Param('id') id: string, @Body() equipment: Equipment) {
    return this.service.update(id, equipment);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Equipment by ID' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}