const User = require("../models/user.model.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/error.js");

const signup = async (req, res, next) => {
  try {
    const { username, email, password, adminSignup } = req.body;
    if (
      !username ||
      !email ||
      !password ||
      username == "" ||
      email == "" ||
      password == ""
    ) {
      next(errorHandler(400, "All fields are required"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      adminSignup,
    });

    await newUser.save();
    res.status(201).json({ message: "user signed up successfully" });
  } catch (err) {
    // console.log("err:", err);
    // res.status(500).json({ message: err?.message });
    next(err);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  
  
  if (!email || !password || email == "" || password == "") {
    next(errorHandler(400, "All fields are required"));
  }
 
  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "Invalid credentials"));
    }
    
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
     return next(errorHandler(400, "Invalid credentials"));
    }

    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({ ...rest });
  } catch (error) {
    console.log('error:', error);
    
    next(error);
  }
};
module.exports = { signup, signin };
