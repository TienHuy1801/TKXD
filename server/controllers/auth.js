import User from "../models/user.js";
import bcrypt from "bcrypt";

const signIn = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username: username });

    if (!user) {
      res.status(400).json("Tài khoản không tồn tại");
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      !validPassword && res.status(400).json("Sai mật khẩu");
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const signUp = async (req, res) => {
  try {
    const fullname = req.body.fullname;
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username: username });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        fullname: fullname,
        username: username,
        password: hashedPassword,
        role: 3,
      });

      await newUser.save();
      res.status(200).json(newUser);
    } else {
      res.status(400).json("Tên đăng nhập đã có người sử dụng");
    }
  } catch (e) {
    res.status(500).json(error);
  }
};

export { signIn, signUp };
