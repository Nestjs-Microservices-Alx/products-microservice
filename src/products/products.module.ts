import { Module } from '@nestjs/common';

import { SharedModule } from 'src/shared/shared.module';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [SharedModule],
})
export class ProductsModule {}
