import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),

  email: Joi.string()
    .email({ tlds: { allow: false } })  // Yes — we use tlds: { allow: false } so that during development/testing we can use any fake or local email domains without Joi rejecting them. By default tlds : true so only valid like @gmail.com , @yahoo.in will allowed
    .required(),

  password: Joi.string().min(6).max(30).required(),

  avatar: Joi.string().uri().optional(),
});


export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } }) // tlds - top level domain name ex., @gmail.com ,@yahoo.in
    .required(),

  password: Joi.string().required(),
});



import Joi from "joi";

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string()
    .min(6)
    .max(30)
    .required(),
  newPassword: Joi.string()
    .min(6)
    .max(30)
    .required(),
});
