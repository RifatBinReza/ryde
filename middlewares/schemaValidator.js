const Joi = require("joi");
/**
 * 
 * @returns next when the schema is validated or error if not
 */
const schemaValidator = () => {
  // Validate the create user schema
  const createUserSchema = (req, res, next) => {
    const schema = Joi.object().keys({
      name: Joi.string().required().messages({
        "string.base": `"name" should be a type of 'text'`,
        "string.empty": `"name" cannot be an empty field`,
        "any.required": `"name" is a required field`,
      }),
      username: Joi.string().required().messages({
        "string.base": `"username" should be a type of 'text'`,
        "string.empty": `"username" cannot be an empty field`,
        "any.required": `"username" is a required field`,
      }),
      email: Joi.string().required().email().messages({
        "string.base": `"email" should be a type of 'email'`,
        "string.empty": `"email" cannot be an empty field`,
        "any.required": `"email" is a required field`,
      }),
      dob: Joi.string().required().isoDate().messages({
        "string.base": `"dob" should be a type of 'date'`,
        "string.empty": `"dob" cannot be an empty field`,
        "any.required": `"dob" is a required field`,
      }),
      address: Joi.object()
        .keys({
          name: Joi.string().required().messages({
            "string.base": `"name" should be a type of 'text'`,
            "string.empty": `"name" cannot be an empty field`,
            "any.required": `"name" is a required field`,
          }),
          line1: Joi.string().required().messages({
            "string.base": `"line1" should be a type of 'text'`,
            "string.empty": `"line1" cannot be an empty field`,
            "any.required": `"line1" is a required field`,
          }),
          line2: Joi.string().required().messages({
            "string.base": `"line2" should be a type of 'text'`,
            "string.empty": `"line2" cannot be an empty field`,
            "any.required": `"line2" is a required field`,
          }),
          position: Joi.object().required().messages({
            "string.base": `"position" should be a type of 'object' containing 'coordinates'`,
            "string.empty": `"position" cannot be an empty field`,
            "any.required": `"position" is a required field`,
          }),
        })
        .required(),
      password: Joi.string()
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(8)
        .messages({
          "string.base": `"password" should be a type of 'text'`,
          "string.empty": `"password" cannot be an empty field`,
          "string.min": `"password" should have a minimum length of {#limit}`,
          "any.required": `"password" is a required field`,
        }),
    });
    validateRequest(req, res, next, schema);
  };

  // Validate the update user schema
  const updateUserSchema = (req, res, next) => {
    const schema = Joi.object().keys({
      name: Joi.string().required().messages({
        "string.base": `"name" should be a type of 'text'`,
        "string.empty": `"name" cannot be an empty field`,
        "any.required": `"name" is a required field`,
      }),
      username: Joi.string().required().messages({
        "string.base": `"username" should be a type of 'text'`,
        "string.empty": `"username" cannot be an empty field`,
        "any.required": `"username" is a required field`,
      }),
      email: Joi.string().required().email().messages({
        "string.base": `"email" should be a type of 'email'`,
        "string.empty": `"email" cannot be an empty field`,
        "any.required": `"email" is a required field`,
      }),
      dob: Joi.string().required().isoDate().messages({
        "string.base": `"dob" should be a type of 'date'`,
        "string.empty": `"dob" cannot be an empty field`,
        "any.required": `"dob" is a required field`,
      }),
      address: Joi.object()
        .keys({
          name: Joi.string().required().messages({
            "string.base": `"name" should be a type of 'text'`,
            "string.empty": `"name" cannot be an empty field`,
            "any.required": `"name" is a required field`,
          }),
          line1: Joi.string().required().messages({
            "string.base": `"line1" should be a type of 'text'`,
            "string.empty": `"line1" cannot be an empty field`,
            "any.required": `"line1" is a required field`,
          }),
          line2: Joi.string().required().messages({
            "string.base": `"line2" should be a type of 'text'`,
            "string.empty": `"line2" cannot be an empty field`,
            "any.required": `"line2" is a required field`,
          }),
          position: Joi.object().required().messages({
            "string.base": `"position" should be a type of 'object' containing 'coordinates'`,
            "string.empty": `"position" cannot be an empty field`,
            "any.required": `"position" is a required field`,
          }),
        })
        .required()
    });
    validateRequest(req, res, next, schema);
  };

  // Validate the login schema
  const loginUserSchema = (req, res, next) => {
    const schema = Joi.object().keys({
      email: Joi.string().required().email().messages({
        "string.base": `"email" should be a type of 'email'`,
        "string.empty": `"email" cannot be an empty field`,
        "any.required": `"email" is a required field`,
      }),
      password: Joi.string()
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(8)
        .messages({
          "string.base": `"password" should be a type of 'text'`,
          "string.empty": `"password" cannot be an empty field`,
          "string.min": `"password" should have a minimum length of {#limit}`,
          "any.required": `"password" is a required field`,
        }),
    });
    validateRequest(req, res, next, schema);
  };

  const validateRequest = (req, res, next, schema) => {
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      return res.status(400).json({ message: error.message });
    } else {
      req.body = value;
      next();
    }
  };
  return {
    createUserSchema,
    updateUserSchema,
    loginUserSchema,
  };
};

module.exports = schemaValidator();
