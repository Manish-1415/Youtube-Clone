import Joi from "joi";

export const createChannelSchema = Joi.object({
  channelName: Joi.string()
    .trim()
    .max(100)
    .required(),

  description: Joi.string()
    .trim()
    .max(2000)
    .allow("", null),

  avatar: Joi.object({
    url: Joi.string().required(),
    path: Joi.string().required(),
  }).required(),
});




export const updateChannelSchema = Joi.object({
  channelName: Joi.string()
    .trim()
    .max(100)
    .optional(),

  description: Joi.string()
    .trim()
    .max(2000)
    .allow("", null)
    .optional(),

  avatar: Joi.object({
    url: Joi.string().required(),
    path: Joi.string().required(),
  }).optional(),
}).min(1); // at least one field must be updated
