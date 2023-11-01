const Joi = require('joi');

exports.workoutSchema = Joi.object({
  title: Joi.string().required(),
  load: Joi.number().required().min(0),
  reps: Joi.number().required().min(0),
  images: Joi.string(),
});

// prettier-ignore
exports.userSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(36)
    .required(),

  password: Joi.string()
    .required()
    .pattern(
      new RegExp(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$'
      )
    ),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  })
