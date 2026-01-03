import Joi from "joi";

export const createCommentSchema = Joi.object({
  content: Joi.string()
    .trim()
    .min(1)
    .max(2000)
    .required()
});



export const updateCommentSchema = Joi.object({
    content: Joi.string()
        .min(1)
        .max(1000)
        .trim()
        .required()
        .messages({
            "string.empty": "Comment cannot be empty",
            "string.min": "Comment must contain at least 1 character",
            "string.max": "Comment cannot exceed 1000 characters"
        })
});
// For this u dont need middleware checker.