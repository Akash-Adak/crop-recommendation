import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import registrationSchema from "../validators/user-validators.js";
import Joi from "joi";

/*  LOGIN VALIDATION SCHEMA */
const loginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required()
});

/* ================= REGISTER ================= */
const register = async (req, res) => {
  try {
    const value = await registrationSchema.validateAsync(req.body, {
      abortEarly: false
    });

    const { username, email, phone, password } = value;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        msg: "User already exists"
      });
    }

    const user = await User.create({
      username,
      email,
      phone,
      password
    });

    return res.status(201).json({
      msg: "User registered successfully"
    });
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        msg: "Validation failed",
        errors: error.details.map(err => err.message)
      });
    }

    return res.status(500).json({
      msg: "User registration failed",
      error: error.message
    });
  }
};

/* ================= LOGIN ================= */
const login = async (req, res) => {
  try {
    const value = await loginSchema.validateAsync(req.body, {
      abortEarly: false
    });

    const { email, password } = value;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        msg: "User not found. Please register first"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        msg: "Invalid password"
      });
    }

    return res.status(200).json({
      msg: "Login successful",
      token: user.generateToken()
    });

  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        msg: "Validation failed",
        errors: error.details.map(err => err.message)
      });
    }

    return res.status(500).json({
      msg: "User login failed",
      error: error.message
    });
  }
};

export default { register, login };
