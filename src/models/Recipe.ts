import mongoose, { Schema, Document } from 'mongoose';

export interface IRecipe extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  difficulty: string;
  cookingTime: number;
  image?: string;
  ingredients: string[];
  instructions: string[];
  author: { name: string; email: string; photoURL?: string };
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const recipeSchema = new Schema<IRecipe>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: [150, 'Short description cannot exceed 150 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Fast Food', 'Healthy', 'Seafood', 'Vegetarian'],
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty is required'],
      enum: ['Easy', 'Medium', 'Hard'],
    },
    cookingTime: {
      type: Number,
      required: [true, 'Cooking time is required'],
    },
    image: String,
    ingredients: {
      type: [String],
      required: [true, 'At least one ingredient is required'],
    },
    instructions: {
      type: [String],
      required: [true, 'At least one instruction is required'],
    },
    author: {
      name: String,
      email: String,
      photoURL: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

recipeSchema.index({ category: 1 });
recipeSchema.index({ title: 'text' });
recipeSchema.index({ createdAt: -1 });

export const Recipe = mongoose.model<IRecipe>('Recipe', recipeSchema);
