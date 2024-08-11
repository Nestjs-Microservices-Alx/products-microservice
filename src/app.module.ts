import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [ProductsModule, SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
