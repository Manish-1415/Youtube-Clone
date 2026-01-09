import Joi from "joi";

export const reactionSchema = Joi.object({
  targetId: Joi.string()
    .hex()
    .length(24)                 // Mongo ObjectId check
    .required(),

  targetType: Joi.string()
    .valid("video", "comment")  // what is being reacted to
    .required(),

  reactionByUser: Joi.string()
    .valid("like", "dislike")   // user action
    .required()
});
