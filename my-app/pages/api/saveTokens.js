export default function handler(req, res) {
    const { accessToken, refreshToken } = req.body;

    res.setHeader('Set-Cookie', [
        `accessToken=${accessToken}; HttpOnly; Path=/; Secure; SameSite=Strict`,
        `refreshToken=${refreshToken}; HttpOnly; Path=/; Secure; SameSite=Strict`
      ]);
    
      res.status(200).json({ success: true });
      
  }
  