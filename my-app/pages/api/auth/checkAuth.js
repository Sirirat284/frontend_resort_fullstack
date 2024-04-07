import jwt from 'jsonwebtoken';

// ฟังก์ชันสำหรับตรวจสอบและ decode token
function verifyToken(token) {
  // ตรวจสอบและ decode token ที่นี่
  return jwt.verify(token, process.env.JWT_SECRET); // ใช้ secret key จาก environment variables
}

// API Route handler
export default function verify(req, res) {
  const token = req.cookies.accessToken; // ได้มาจาก HttpOnly Cookie
  if (!token) {
    return res.status(200).json({ isLoggedIn: false });
  }
  
    const decoded = verifyToken(token);
    // ตรวจสอบ role
    if (decoded.role === "User") {
        return res.status(200).json({ isLoggedIn: true, role: decoded.role });
      } else {
        return res.status(200).json({ isLoggedIn: false });
      }

}
