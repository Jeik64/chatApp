import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const hardcodedUsers = [
  { username: 'test1', password: 'pa55w0rd' },
  { username: 'test2', password: 'w0rdpa55' }
];

// Create hardcoded users at startup
(async () => {
  try {
    for (const userData of hardcodedUsers) {
      const user = await User.findOne({ username: userData.username });
      if (!user) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        await User.create({ username: userData.username, password: hashedPassword });
      }
    }
  } catch (err) {
    console.error('Error creating hardcoded users:', err.message);
  }
})();

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ error: "Failed to register user" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Failed to log in" });
  }
};
