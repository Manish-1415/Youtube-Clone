import Joi from "joi";

export const playlistValidationSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required(),

  videoId: Joi.string()
    .hex()
    .length(24)
    .optional(),

  visibility: Joi.string()
    .valid("public", "private")
    .default("public"),
});


export const videoIdValidation = Joi.string().hex().length(24).required();