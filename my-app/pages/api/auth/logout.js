export default function handler(req, res) {
    // ล้าง cookie ที่เก็บ accessToken หรือ refreshToken
    res.setHeader('Set-Cookie', [
      'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
      'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
    ]);
    
    // ส่งคำตอบกลับไปยัง client ว่าการออกจากระบบสำเร็จ
    res.status(200).json({ success: true });
/*
res.clearCookie('accessToken', { path: '/', domain: '.sirirat.top' });
res.clearCookie('refreshToken', { path: '/', domain: '.sirirat.top' });
res.status(200).json({ success: true });*/

  }
