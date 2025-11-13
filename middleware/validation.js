const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  price: Joi.number().positive().required(),
  category: Joi.string().min(1).required(),
  inStock: Joi.boolean().required()
});

const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: { message: error.details[0].message } });
  }
  next();
};

module.exports = validateProduct;