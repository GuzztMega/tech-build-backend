import { ApiProperty } from '@nestjs/swagger';
import { PointDto } from 'src/point/point.model';

export class NewEquipmentDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly serialNumber: string;

  @ApiProperty({ type: [PointDto], isArray: true })
  readonly points: PointDto[];
}