const Joi = require("joi");
const errorFunction = require("../utils/errorFunction");


const addCartsSchema = Joi.object({
  userId: Joi.string().max(100).required(), 
  productId: Joi.string().max(100).required(),
  productName: Joi.string().min(5).max(100).required(),
  productBrand: Joi.string().max(100).required(),
  type: Joi.string().max(100).required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  images: Joi.array().items(Joi.string().required()),
});

const cartValidation= (req, res, next) => {
  const { error } = addCartsSchema.validate(req.body);
  if (error) {
    res.status(406);
    return res.json(
      errorFunction(true, 406, `Error in Order Data: ${error.message}`)
    );
  } else {
    next();
  }
}

module.exports = { cartValidation };