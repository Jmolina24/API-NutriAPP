const { check } = require('express-validator');
const { validateResul } = require('../helpers/login.helper')


const validateRegisterNew = [
  check('primer_nombre')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("First name is required"),

  check('primer_apellido')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("Surname name is required"),

  check('fecha_nacimiento', 'Invalid date of birth value')
    .exists()
    .not()
    .isEmpty()
    .isDate(),

  check('tipo_documento')
    .exists()
    .not()

    .isEmpty(),
  check('num_documento')
    .exists()
    .not()
    .isEmpty(),

  check('email')
    .exists()
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Invalid email address value")
    .normalizeEmail(),



  check('telefono', 'Phone number value Invalid')
    .exists()
    .not()
    .isEmpty()
    .isNumeric()
    .custom((value) => {
      if (value.length !== 10) {
        return Promise.reject("Phone number should be 10 digits");
      } else {
        return true;
      }
    }),

  check('genero')
    .exists()
    .not()
    .isEmpty(),

  check('password')
    .exists()
    .not()
    .isEmpty()
    .isLength({ min: 8, max: 15 })
    .withMessage("Your password should have min and max length between 8-15")
    .matches(/\d/)
    .withMessage("Your password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Your password should have at least one sepcial character"),




  check('plan_id')
    .exists()
    .isNumeric()
    .not()
    .isEmpty(),

  // check('peso')
  // .exists()
  // .isNumeric()
  // .not()
  // .isEmpty()
  // .isLength({ min: 10, max: 400 })
  // .withMessage("The entered weight must be in the minimum and maximum ranges between 10 and 400"),

  // check('estatura')
  // .exists()
  // .isNumeric()
  // .not()
  // .isEmpty()
  // .isLength({ min: 10, max: 250 })
  // .withMessage("The fingered height must be in the minimum and maximum ranges between 10 and 250"),

  // check('talla_cuello')
  // .exists()
  // .isNumeric()
  // .not()
  // .isEmpty()
  // .isLength({ min: 10, max: 100 })
  // .withMessage("The fingered neck size must be in the minimum and maximum ranges between 10 and 100"),

  // check('talla_abdomen')
  // .exists()
  // .isNumeric()
  // .not()
  // .isEmpty()
  // .isLength({ min: 20, max: 400 })
  // .withMessage("The size of the abdomen must be in the minimum and maximum ranges between 20 and 400"),

  (req, res, next) => {
    validateResul(req, res, next)
  }


]


const validateSign = [
  check('usuario')
    .exists()
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Invalid usuario value")
    .normalizeEmail(),


  check('password')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),


  (req, res, next) => {
    validateResul(req, res, next)
  }

]


const validateRecoverkey = [
  check('correo')
    .exists()
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Invalid email address value")
    .normalizeEmail(),

  (req, res, next) => {
    validateResul(req, res, next)
  }

]


const validateChangePassword = [
  check('user_id')
  .exists()
  .isNumeric()
  .not()
  .isEmpty(),

  check('clave_nueva')
    .exists()
    .not()
    .isEmpty()
    .isLength({ min: 8, max: 15 })
    .withMessage("Your password should have min and max length between 8-15")
    .matches(/\d/)
    .withMessage("Your password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Your password should have at least one sepcial character"),


  (req, res, next) => {
    validateResul(req, res, next)
  }


]


module.exports = { validateRegisterNew , validateSign, validateRecoverkey, validateChangePassword}