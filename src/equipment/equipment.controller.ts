import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { EquipmentService } from './equipment.service';
import { NewEquipmentDto } from './new-equipment.dto';

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
  @ApiBody({ type: NewEquipmentDto })
  @ApiOperation({ summary: 'Create a new Equipment/Points' })
  create(@Body() equipmentDto: NewEquipmentDto) {
    return this.service.create(equipmentDto);
  }

  @Put(':id')
  @ApiBody({ type: NewEquipmentDto })
  @ApiOperation({ summary: 'Update a Equipment/Points by Equipment ID sending an updated body' })
  update(@Param('id') id: string, @Body() equipmentDto: NewEquipmentDto) {
    return this.service.update(id, equipmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Equipment by ID' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}