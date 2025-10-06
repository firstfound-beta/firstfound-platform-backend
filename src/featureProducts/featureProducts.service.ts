import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFeatureProductsDto } from './dto/create-feature-products.dto';
import { UpdateFeatureProductsDto } from './dto/update-feature-product.dto';
import { FeatureProducts } from './schemas/products.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(FeatureProducts.name)
    private productModel: Model<FeatureProducts>,
  ) {}

  // Create a product
  async create(
    createProductDto: CreateFeatureProductsDto,
  ): Promise<FeatureProducts> {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  // Get all approved products
  async findAll(approvedOnly = true): Promise<FeatureProducts[]> {
    const filter = approvedOnly ? { status: 'approved' } : {};
    return this.productModel.find(filter).exec();
  }

  // Get one product by ID (only if approved)
  async findOne(id: string): Promise<FeatureProducts> {
    const product = await this.productModel
      .findOne({ _id: id, status: 'approved' })
      .exec();
    if (!product) {
      throw new NotFoundException(`Approved product with ID ${id} not found`);
    }
    return product;
  }

  // Update a product
  async update(
    id: string,
    updateProductDto: UpdateFeatureProductsDto,
  ): Promise<FeatureProducts> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  // Delete a product
  async remove(id: string): Promise<{ message: string }> {
    const result = await this.productModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return { message: `Product with ID ${id} deleted successfully` };
  }
  async updateStatus(id: string, status: string): Promise<FeatureProducts> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }
  // Get a product by ID without filtering by approval
  async findOneWithoutApproval(id: string): Promise<FeatureProducts> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }
}
