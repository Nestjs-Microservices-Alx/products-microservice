import { HttpStatus, Injectable } from '@nestjs/common';

import { RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/shared/dtos';
import { PrismaService } from 'src/shared/services';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({
      data: createProductDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const [total, products] = await Promise.all([
      this.prismaService.product.count({
        where: {
          // soft delete
          available: true,
        },
      }),
      this.prismaService.product.findMany({
        skip: (page - 1) * limit, // -1 'cause page starts at 1
        take: limit,
        where: {
          // soft delete
          available: true,
        },
      }),
    ]);

    const lastPage = Math.ceil(total / limit);
    const nextPage = page < lastPage ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    return {
      meta: {
        total,
        page,
        limit,
        lastPage,
        nextPage,
        prevPage: page > lastPage ? null : prevPage,
      },
      data: products,
    };
  }

  async findOne(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id,

        // soft delete
        available: true,
      },
    });
    // if (!product) throw new NotFoundException(`Product #${id} not found`); // rest
    if (!product)
      throw new RpcException({
        message: `Product #${id} not found`,
        status: HttpStatus.NOT_FOUND,
      }); // microservices - el client lo recibe como un error, pero ya no se ve el error en el microservicio

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // microservices adjust -----------
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...data } = updateProductDto; // do not update id

    await this.findOne(id);

    return this.prismaService.product.update({
      where: { id },
      data,
    });
  }

  // en microservices el DELETE FISICO NO se debe hacer xq no se sabe cuantos servicios dependen de ese recurso y debuggear entre microservicios es complicado
  async remove(id: number) {
    /*     // HARD DELETE --------
    await this.findOne(id);

    this.prismaService.product.delete({
      where: { id },
    }); */

    // SOFT DELETE --------
    await this.findOne(id);
    await this.prismaService.product.update({
      where: { id },
      data: { available: false, deletedAt: new Date() },
    });
  }

  async findByIds(ids: number[]) {
    const uniqueIds = [...new Set(ids)]; // remove duplicates

    const products = await this.prismaService.product.findMany({
      where: {
        id: {
          in: uniqueIds,
        },

        // soft delete
        available: true,
      },
    });

    // validate if all products were found
    if (products.length !== uniqueIds.length) {
      const missingIds = uniqueIds.filter(
        (id) => !products.map((product) => product.id).includes(id),
      );

      throw new RpcException({
        message: `Products #${missingIds.join(', ')} not found`,
        status: HttpStatus.NOT_FOUND,
      });
    }

    return products;
  }
}
