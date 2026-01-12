import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import Gender from "../enums/gender";
import { generateTokens, verifyRefreshToken } from "../config/jwt";

const userRepository = AppDataSource.getRepository(User);

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await userRepository.findOne({
      where: { email, isDeleted: false },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const { password: _, refreshToken: __, ...userWithoutPassword } = user;

    const { accessToken, refreshToken } = generateTokens(user.id, user.email);

    // Store refresh token in database
    user.refreshToken = refreshToken;
    await userRepository.save(user);

    res.json({
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, age, gender, description } =
      req.body;

    if (!firstName || !lastName || !email || !password || !age || !gender) {
      return res.status(400).json({
        error:
          "First name, last name, email, password, age, and gender are required",
      });
    }

    if (!Object.values(Gender).includes(gender)) {
      return res.status(400).json({
        error: "Gender must be 'male', 'female', or 'other'",
      });
    }

    const existingUser = await userRepository.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
      gender,
      description,
      photos: [],
    });

    const savedUser = await userRepository.save(user);

    const { password: _, refreshToken: __, ...userWithoutPassword } = savedUser;

    const { accessToken, refreshToken } = generateTokens(
      savedUser.id,
      savedUser.email
    );

    // Store refresh token in database
    savedUser.refreshToken = refreshToken;
    await userRepository.save(savedUser);

    res.status(201).json({
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token is required" });
    }

    // Verify the refresh token
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    // Find user and verify refresh token matches stored one
    const user = await userRepository.findOne({
      where: { id: decoded.userId, isDeleted: false },
    });

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user.id,
      user.email
    );

    // Store new refresh token in database
    user.refreshToken = newRefreshToken;
    await userRepository.save(user);

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token is required" });
    }

    // Verify and find user
    const decoded = verifyRefreshToken(refreshToken);
    if (decoded) {
      const user = await userRepository.findOne({
        where: { id: decoded.userId },
      });

      if (user) {
        // Clear refresh token from database
        user.refreshToken = null;
        await userRepository.save(user);
      }
    }

    res.json({ message: "Logged out successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.find({
      where: { isDeleted: false },
      select: [
        "id",
        "firstName",
        "lastName",
        "email",
        "dateJoined",
        "age",
        "gender",
        "description",
        "photos",
      ],
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOne({
      where: { id: parseInt(req.params.id), isDeleted: false },
      select: [
        "id",
        "firstName",
        "lastName",
        "email",
        "dateJoined",
        "age",
        "gender",
        "description",
        "photos",
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, age, gender, description, photos } = req.body;
    const userId = parseInt(req.params.id);

    const user = await userRepository.findOne({
      where: { id: userId, isDeleted: false },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (age !== undefined) user.age = age;
    if (gender !== undefined) user.gender = gender;
    if (description !== undefined) user.description = description;
    if (photos !== undefined) user.photos = photos;

    const savedUser = await userRepository.save(user);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = savedUser;
    res.json(userWithoutPassword);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.isDeleted = true;
    await userRepository.save(user);

    res.json({ message: "User deleted successfully", id: userId });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
