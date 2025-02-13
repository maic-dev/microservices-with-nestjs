import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy
  ) { }

  @Post()
  createProduct(@Body() createProductDto: any) {
    return this.productsClient.send({ cmd: 'create_product' }, createProductDto);
  }

  @Get()
  getAllProducts() {
    return this.productsClient.send({ cmd: 'get_products' }, {})
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'get_product' }, { id })
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: any) {
    const payload = {
      id: parseInt(id),
      ...updateProductDto
    };
    return this.productsClient.send({ cmd: 'update_product' }, payload);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'delete_product' }, { id });
  }
}