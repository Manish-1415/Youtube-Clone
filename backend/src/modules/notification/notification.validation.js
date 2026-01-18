import Joi from "joi";

export const markNotificationReadValidation = Joi.object({
  isRead: Joi.boolean().valid(true).required()
});
