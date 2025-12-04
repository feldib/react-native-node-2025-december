import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Category } from "../entities/Category";

const categoryRepository = AppDataSource.getRepository(Category);

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryRepository.find();
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await categoryRepository.findOne({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const categoryId = parseInt(req.params.id);

    const category = await categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    if (name !== undefined) category.name = name;

    const savedCategory = await categoryRepository.save(category);
    res.json(savedCategory);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
