import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class OrderService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('OrderService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database is connected')
  }

  create(createOrderDto: CreateOrderDto) {
    return this.order.create({ data: createOrderDto });
  }

  findAll() {
    return this.order.findMany({});
  }

  findOne(id: string) {
    return this.order.findFirst({ where: { id } });
  }
}
