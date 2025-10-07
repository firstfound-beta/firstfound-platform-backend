import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { Logger } from '@nestjs/common';
import to from 'await-to-js';
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  private handleDatabaseError(error: Error, message: string): void {
    this.logger.error(`${message}: ${error.message}`);
    throw new BadRequestException(message);
  }
  private validateObjectId(id: string): void {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
  }
  async createUser(data: Partial<User>): Promise<User> {
    const user = new this.userModel(data);
    const [err, savedUser] = await to(user.save());
    if (err) {
      this.handleDatabaseError(err, 'Failed to create user');
    }
    this.logger.log(`User created with ID: ${savedUser._id}`);
    return savedUser!;
  }
  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    this.validateObjectId(id);

    const [err, user] = await to(
      this.userModel.findByIdAndUpdate(id, updates, { new: true }).exec(),
    );
    if (err) {
      this.handleDatabaseError(err, 'Error updating user');
    }
    if (!user) {
      throw new NotFoundException('User not found or unable to update');
    }
    this.logger.log(`User updated with ID: ${user._id}`);
    return user;
  }
  async getUserById(id: string): Promise<User> {
    this.validateObjectId(id);

    const [err, user] = await to(this.userModel.findById(id).exec());
    if (err) {
      this.handleDatabaseError(err, 'Error finding user');
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
