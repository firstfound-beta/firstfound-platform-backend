import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './featureProducts.service';
import { CreateFeatureProductsDto } from './dto/create-feature-products.dto';
import { UpdateFeatureProductsDto } from './dto/update-feature-product.dto';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
@Controller('featureProducts')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Create a product - POST /featureProducts
  @Post()
  create(@Body() createProductDto: CreateFeatureProductsDto) {
    return this.productsService.create(createProductDto);
  }

  // Get all products - GET /products
  @Get()
  async getAllApprovedProducts() {
    const products = await this.productsService.findAll();
    return {
      message: 'Approved products fetched successfully',
      data: products,
    };
  }

  // ✅ New endpoint: Get all products regardless of status
  @Get('all')
  async getAllProducts() {
    const products = await this.productsService.findAll(false); // pass false to fetch all
    return {
      message: 'All products fetched successfully',
      data: products,
    };
  }

  // Get product by ID - GET /products/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  // Update a product - PUT /products/:id
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateFeatureProductsDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  // Delete a product - DELETE /products/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
  @Patch(':id/update-status')
  @ApiOperation({ summary: 'Update the status of a feature product' })
  @ApiParam({ name: 'id', description: 'Product ID to update status' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'approved',
          enum: ['pending', 'approved', 'rejected'],
        },
      },
    },
  })
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return { message: 'Invalid status value' };
    }

    const updatedProduct = await this.productsService.updateStatus(id, status);
    return {
      message: `Product status updated to '${status}' successfully`,
      data: updatedProduct,
    };
  }

  @Get('admin/:id')
  @ApiOperation({ summary: 'Get a product by ID (all statuses)' })
  @ApiParam({ name: 'id', description: 'Product ID to fetch' })
  async getProductByIdWithoutApproval(@Param('id') id: string) {
    const product = await this.productsService.findOneWithoutApproval(id);
    return {
      message: 'Product fetched successfully',
      data: product,
    };
  }

  @Get('startup/:startUpId')
  @ApiOperation({ summary: 'Get products by Startup ID' })
  @ApiParam({
    name: 'startUpId',
    description: 'Startup ID to fetch products for',
  })
  async getProductsByStartupId(@Param('startUpId') startUpId: string) {
    const products = await this.productsService.findByStartupId(startUpId);
    console.log(`Fetched products for Startup ID ${startUpId}:`, products);
    return {
      message: `Products for Startup ID ${startUpId} fetched successfully`,
      data: products,
    };
  }
}
