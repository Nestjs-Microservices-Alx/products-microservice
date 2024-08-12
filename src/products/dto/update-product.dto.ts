import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsPositive } from 'class-validator';

import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  // // microservices el ID viene en el @Payload
  @IsNumber()
  @IsPositive()
  id: number;
}
