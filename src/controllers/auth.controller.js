import { loginValidation, signupValidation } from "../utils/validations.js";
import { db } from "../index.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

function hashPassword(password) {
  const salt = crypto.randomBytes(12).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 500, 64, "sha256").toString("hex");
  return [salt, hash].join("$");
}

function verifyPassword(inputPassword, originalHashedPassword) {
  const [salt, hash] = originalHashedPassword.split("$");
  const inputHash = crypto.pbkdf2Sync(inputPassword, salt, 500, 64, "sha256").toString("hex")
  return inputHash === hash;
}

async function login(req, res) {
  try {
    // validate request body
    const { error } = loginValidation.validate(req.body);
    if (error)
      return res.status(400).json({ status: 400, message: error.details[0].message });

    // fetch user from database
    const { username, password } = req.body;
    const user = await db("User").where({ username });
    if (!user || !user.length)
      return res.status(404).json({ status: 404, message: "User not found" });

    // compare password
    const originalHashedPassword = user[0].password;
    const isPasswordCorrect = verifyPassword(password, originalHashedPassword);
    if (!isPasswordCorrect)
      return res.status(401).json({ status: 401, message: "Invalid credentials" });

    // sign a token
    const token = jwt.sign({ username, fullname: user[0].fullname }, process.env.JWT_SECRET, { expiresIn: "10m" });

    return res.status(200).json({ status: 200, message: "Login successful", token });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

async function signup(req, res) {
  try {
    //validate request body
    const { error } = signupValidation.validate(req.body);
    if (error)
      return res.status(400).json({ status: 400, message: error.details[0].message });

    const { fullname, username, email, password } = req.body;

    const userExists = await db("User").where({ username });
    console.log(userExists);
    if (userExists && userExists.length)
      return res.status(400).json({ status: 400, message: "User already exists" });
    
    const hashedPassword = hashPassword(password);
    await db("User").insert({ fullname, username, email, password: hashedPassword, created_at: new Date() }).returning("*");

    const token = jwt.sign({ username, fullname }, process.env.JWT_SECRET, { expiresIn: "10m" });
    res
      .status(201)
      .json({
        status: 201,
        message: "User created successfully",
        token,
        user: { username, email, fullname },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

export const authController = {
  login,
  signup,
};
