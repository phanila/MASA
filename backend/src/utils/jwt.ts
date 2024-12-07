import jwt from 'jsonwebtoken';

export const generateToken = (userId: number): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
