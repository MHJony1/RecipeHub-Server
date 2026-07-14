import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { AppError } from '../utils/AppError';
import { config } from '../config/env';
import type { RegisterInput, LoginInput } from '../validators/auth';

export const authService = {
  async register(data: RegisterInput) {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new AppError('Email already registered', 409);
    }

    const user = new User(data);
    await user.save();

    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: '7d',
    });

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        photoURL: user.photoURL,
      },
      token,
    };
  },

  async login(data: LoginInput) {
    const user = await User.findOne({ email: data.email }).select('+password');
    if (!user || !(await user.comparePassword(data.password))) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: '7d',
    });

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        photoURL: user.photoURL,
      },
      token,
    };
  },

  async getCurrentUser(userId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      photoURL: user.photoURL,
    };
  },
};
