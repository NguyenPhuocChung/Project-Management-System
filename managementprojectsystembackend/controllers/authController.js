const User = require("../models/accountModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken"); // Import JWT library
require("dotenv").config(); // Đảm bảo rằng dòng này được thêm vào đầu file
const session = require("express-session");

//
const isAuthenticated = (req, res, next) => {
  const token = req.session.UserToken; // Lấy token từ session
  console.log("Token in session:", token);
  console.log("Session data in route:", req.session.UserToken);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access: No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      return res
        .status(401)
        .json({ message: "Unauthorized access: Invalid token" });
    }

    req.user = decoded; // Lưu thông tin người dùng vào req
    console.log("Decoded user:", req.user);
    next(); // Tiếp tục đến middleware hoặc route handler tiếp theo
  });
};
// Hàm gửi OTP qua email
const sendOTP = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "chungnp160902@gmail.com",
      pass: "fwbo fixz elfu arxu", // Thay bằng mật khẩu ứng dụng của bạn
    },
  });

  const mailOptions = {
    from: '"Công Ty CNHH 5 thành viên" <chungnp160902@gmail.com>',
    to, // Địa chỉ email của người dùng
    subject: "Mã OTP",
    html: `Mã OTP của bạn là: <strong>${otp}</strong>`, // Cải thiện định dạng email
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP đã được gửi thành công");
  } catch (error) {
    console.error("Lỗi khi gửi email:", error);
  }
};

// Hàm gửi email thông báo mật khẩu
const sendEmail = async (to, password) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "chungnp160902@gmail.com", // Thay bằng email của bạn
      pass: "fwbo fixz elfu arxu", // Thay bằng mật khẩu ứng dụng của bạn
    },
  });

  const mailOptions = {
    from: '"Công Ty CNHH 5 thành viên" <chungnp160902@gmail.com>',
    to,
    subject: "Thông tin tài khoản của bạn",
    html: `<p>Chào bạn,</p>
           <p>Tài khoản của bạn đã được tạo thành công.</p>
           <p><strong>Mật khẩu của bạn là: ${password}</strong></p>
           <p>Hãy đăng nhập và thay đổi mật khẩu ngay sau khi đăng nhập!</p>
           <p>Chúc bạn làm việc vui vẻ!</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email đã được gửi thành công");
  } catch (error) {
    console.error("Lỗi khi gửi email:", error);
  }
};

// Hàm đăng ký người dùng
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
    a;
    console.error("Error during registration:", error);
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
    const user = await User.findOne({ email, role });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or password or role" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email or password or role" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Lưu token vào session
    req.session.UserToken = token; // Lưu token vào session

    console.log("User logged in, storing in session:", req.session.UserToken);
    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email, role: user.role },
      token, // Gửi token về phía client (tuỳ chọn)
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Hàm kiểm tra mật khẩu
const checkPassword = async (req, res) => {
  const id = req.params.id;
  const { password } = req.body;

  console.log("====================================");
  console.log(`ID: ${id}, Password: ${password}`);
  console.log("====================================");

  if (!password || !id) {
    return res.status(400).json({ message: "Password and ID are required" });
  }

  try {
    // Tìm người dùng dựa trên ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    // Nếu thành công, trả về thông tin người dùng
    res.status(200).json({ user: { id: user._id, email: user.email } });
  } catch (error) {
    console.error("Error checking password:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Hàm gửi OTP và lưu vào session
const otpPassword = async (req, res) => {
  const { email } = req.body;

  console.log(email);

  // Tạo mã OTP ngẫu nhiên 6 chữ số
  const otp = Math.floor(100000 + Math.random() * 900000);
  req.session.otp = otp; // Lưu OTP vào session

  // Gửi OTP đến email đã đăng ký
  await sendOTP(email, otp);
  res.status(200).json({ message: "OTP sent to your email!" });
};

// Hàm xác minh và cập nhật mật khẩu
const verifyAndUpdatePassword = async (req, res) => {
  const { otp, password, id } = req.body;
  const userOtp = req.session.otp; // Lấy OTP từ session

  console.log(userOtp, password, id, otp); // Logging để kiểm tra giá trị
  console.log("User OTP in session:", userOtp, typeof userOtp); // Kiểu dữ liệu của OTP trong session
  console.log("OTP entered by user:", otp, typeof otp); // Kiểu dữ liệu của OTP mà người dùng nhập vào

  try {
    // Kiểm tra OTP
    if (String(otp) !== String(userOtp)) {
      return res.status(401).json({ message: "Invalid OTP!" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cập nhật mật khẩu trong cơ sở dữ liệu
    const user = await User.findByIdAndUpdate(id, { password: hashedPassword });
    console.log("====================================");
    console.log(password, hashedPassword, user);
    console.log("====================================");
    // Xóa session
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ message: "Error destroying session" });
      }
    });

    res.status(200).json({ message: "Password updated successfully!" });
    console.log("====================================");
    console.log("thành công");
    console.log("====================================");
  } catch (error) {
    console.error("Error during password update:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
//
// Hàm kiểm tra email
const checkEmailExists = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Trả về ID và thông báo khi email tồn tại
    res.status(200).json({
      message: "Email exists",
      userId: user._id, // Lấy ID người dùng
    });
    console.log("====================================");
    console.log(user._id);
    console.log("====================================");
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
// const logout = (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       console.error("Error during logout:", err);
//       return res.status(500).json({ message: "Failed to logout" });
//     }
//     res.status(200).json({ message: "Logout successful" });
//   });
// };
module.exports = {
  // logout,
  register,
  login,
  checkPassword,
  otpPassword,
  verifyAndUpdatePassword,
  checkEmailExists,
  isAuthenticated,
};
