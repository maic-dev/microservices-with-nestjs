import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProductService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('ProductService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database is connected')
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({ data: createProductDto });
  }

  findAll() {
    return this.product.findMany({ where: { productAvailable: true } });
  }

  async findOne(id: number) {
    const product = await this.product.findUnique({ where: { id, productAvailable: true } });

    if (!product) throw new NotFoundException(`Product #${id} not found`);

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    return this.product.update({ where: { id }, data: updateProductDto });
  }

  async remove(id: number) {
    await this.findOne(id);

    const product = await this.product.update({
      where: { id }, data: { productAvailable: false }
    })

    return product
  }
}
