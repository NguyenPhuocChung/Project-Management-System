const User = require("../models/accountModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

// Hàm gửi email
const sendEmail = async (to, password) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "chungnp160902@gmail.com", // Thay bằng email của bạn
      pass: "fwbo fixz elfu arxu", // Thay bằng mật khẩu ứng dụng
    },
  });

  let mailOptions = {
    from: '"Công Ty CNHH 5 thành viên" <chungnp160902@gmail.com>',
    to: to, // Địa chỉ email của người dùng
    subject: "Thông tin tài khoản của bạn",
    text: `Chào bạn,\n\nTài khoản của bạn đã được tạo thành công.\nMật khẩu của bạn là: ${password}\n\nHãy đăng nhập và thay đổi mật khẩu ngay sau khi đăng nhập!`,
    html: `<p>Chào bạn,</p><p>Tài khoản của bạn đã được tạo thành công.</p><p><strong>Mật khẩu của bạn là: ${password}</strong></p><p>Hãy đăng nhập và thay đổi mật khẩu ngay sau khi đăng nhập!</p><p>Chúc bạn làm việc vui vẻ!</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email đã được gửi thành công");
  } catch (error) {
    console.error("Lỗi khi gửi email:", error);
  }
};

// Hàm đăng ký
const register = async (req, res) => {
  const { role, password, email } = req.body;

  if (!role || !password || !email) {
    return res
      .status(400)
      .json({ message: "Role, password and email are required" });
  }

  try {
    // Kiểm tra xem người dùng đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    // Mã hóa mật khẩu trước khi lưu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = new User({ role, password: hashedPassword, email });

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();

    // Gửi email thông báo mật khẩu
    await sendEmail(email, password);

    res
      .status(201)
      .json({ message: "User registered successfully", user: { role, email } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Hàm đăng nhập
const login = async (req, res) => {
  const { email, role, password } = req.body;

  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Email, role and password are required" });
  }

  try {
    // Tìm người dùng dựa trên email
    const user = await User.findOne({ email, role });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or password or role" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email or password or role" });
    }

    // Nếu thành công, trả về thông báo đăng nhập thành công
    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email, role: user.role },
    });
    console.log(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  register,
  login,
};
