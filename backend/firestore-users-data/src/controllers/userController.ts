import { Request, Response } from 'express';
import { getUserData, saveUserData } from '../services/userService';
import { schema } from '../schema';

/*@ts-ignore*/
export const fetchUserData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.info(`[fetchUserData] Request received for userId: ${userId}`);

    if (!userId) {
      console.warn(`[fetchUserData] Missing userId`);
      return res.status(400).json({ message: 'User ID is required' });
    }

    const userData = await getUserData(userId);
    if (!userData) {
      console.warn(`[fetchUserData] No data found for userId: ${userId}`);
      return res.status(404).json({ message: 'User data not found' });
    }

    console.info(`[fetchUserData] Returning data for userId: ${userId}`);
    res.status(200).json(userData);
  } catch (error: any) {
    console.error(`[fetchUserData] Error fetching user data:`, error);
    res.status(500).json({ message: 'Error fetching user data', error: error.message });
  }
};

/*@ts-ignore*/
export const updateUserData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.info(`[updateUserData] Request received for userId: ${userId}`, req.body);

    if (!userId) {
      console.warn(`[updateUserData] Missing userId`);
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Validate request body against Joi schema
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      console.warn(`[updateUserData] Validation failed for userId: ${userId}`, error.details);
      return res.status(400).json({
        message: 'Invalid data',
        errors: error.details.map(err => err.message),
      });
    }

    const updatedUserData = await saveUserData(userId, req.body);
    console.info(`[updateUserData] Updated data for userId: ${userId}`, updatedUserData);

    res.status(200).json(updatedUserData);
  } catch (error: any) {
    console.error(`[updateUserData] Error updating user data:`, error);
    res.status(500).json({ message: 'Error updating user data', error: error.message });
  }
};
