import Joi from "joi";

export const uploadVideoSchema = Joi.object({
  title: Joi.string()
    .max(150)
    .required(),

  description: Joi.string()
    .max(5000)
    .allow("", null), // optional

  video: Joi.object({
    url: Joi.string().uri().required(),
    path: Joi.string().required(),
  }).required(),

  thumbnail: Joi.object({
    url: Joi.string().uri().required(),
    path: Joi.string().required(),
  }).required(),

  duration: Joi.number()
    .required(),

  visibility: Joi.string()
    .valid("public", "private", "unlisted")
    .default("public"),

  isPublished: Joi.boolean()
    .default(true),

  tags: Joi.array()
    .items(Joi.string())
    .default([]),

//   channelId: Joi.string()
//     .optional(), // optional now, can be null initially
});







export const updateVideoSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(150)
    .optional(),

  description: Joi.string()
    .trim()
    .max(5000)
    .optional(),

  tags: Joi.array()
    .items(Joi.string().trim().max(50))
    .optional(),

  thumbnail: Joi.object({
    url: Joi.string().uri().required(),
    path: Joi.string().required(),
  }).optional(),
});
