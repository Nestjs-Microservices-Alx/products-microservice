import { Controller, ParseIntPipe } from '@nestjs/common';

import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'src/shared/dtos';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post() // RESTful - no quiero tener hibridos
  // create(@Body() createProductDto: CreateProductDto) {
  // manejar standar, todos los us q quieran crear 1 producto deben enviar un mensaje con esta estructura
  @MessagePattern({ cmd: 'create_product' })
  // @Payload() - extrae el payload del mensaje, igual se valida con el class-validator
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // @Get()
  @MessagePattern({ cmd: 'find_all_products' })
  // igual viene en el Payload
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  // @Get(':id')
  @MessagePattern({ cmd: 'find_one_product' })
  // { id: 1 }
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  @MessagePattern({ cmd: 'update_product' })
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+updateProductDto.id, updateProductDto); // +id most efficient than @Param('id', ParseIntPipe)
  }

  // @Delete(':id')
  @MessagePattern({ cmd: 'remove_product' })
  async remove(@Payload('id', ParseIntPipe) id: number) {
    await this.productsService.remove(id);
    return true;
  }

  @MessagePattern({ cmd: 'find_products_by_ids' })
  async findByIds(@Payload('ids') ids: number[]) {
    return this.productsService.findByIds(ids);
  }
}
