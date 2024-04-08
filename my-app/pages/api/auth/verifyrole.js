import jwt from 'jsonwebtoken';

// ฟังก์ชันสำหรับตรวจสอบและ decode token
function verifyToken(token) {
  // ตรวจสอบและ decode token ที่นี่
	console.log('dodo token');
	console.log(token);

  return jwt.verify(token, process.env.JWT_SECRET); // ใช้ secret key จาก environment variables
}

// API Route handler
export default function verify(req, res) {
  const token = req.cookies.accessToken; // ได้มาจาก HttpOnly Cookie
  console.log("token",token)
  if (!token) {
    // return res.status(401).json({ message: "No token provided" });
  }
  
  try {
    const decoded = verifyToken(token);
    // ตรวจสอบ role
    if(decoded.role) {
      return res.status(200).json({ role: decoded.role });
    } else {
      // ถ้า role ไม่ตรงกับที่ต้องการ
      return res.status(403).json({ role: 'unknown' });
    }
  } catch (error) {
    return res.status(403).json({ role: 'unknown' });;
  }
}
