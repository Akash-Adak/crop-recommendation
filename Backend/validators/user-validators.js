import Joi from "joi";

const registrationSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .trim()
    .required()
    .messages({
      "string.base": "Username must be a string",
      "string.alphanum": "Username must only contain alpha-numeric characters",
      "string.min": "Username must be at least 3 characters long",
      "string.max": "Username must be at most 30 characters long",
      "any.required": "Username is required"
    }),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required"
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{10,13}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be 10 to 13 digits",
      "any.required": "Phone number is required"
    }),

  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,30}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be 8–30 characters long and include at least one letter, one number, and one special character",
      "any.required": "Password is required"
    })
});

export default registrationSchema;
