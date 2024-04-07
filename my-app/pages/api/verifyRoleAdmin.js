import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { token } = req.body;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // เมื่อ verify token และ decode สำเร็จ
      // ส่ง role กลับไปยัง client
      res.status(200).json({ role: decoded.role });
    } catch (error) {
      // ถ้ามีปัญหาในการ verify หรือ decode token
      res.status(401).json({ role: 'unknown' });;
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}