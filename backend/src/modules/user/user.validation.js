import Joi from "joi";

export const updateUserProfileSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).optional(),
  email: Joi.string().email().optional(),
});
