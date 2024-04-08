export default function handler(req, res) {
    const { accessToken, refreshToken } = req.body;

	console.log("SAVE TOKEN");
	console.log(req.body);
    res.setHeader('Set-Cookie', [
        `accessToken=${accessToken}; HttpOnly; Path=/;  SameSite=Lax`,
        `refreshToken=${refreshToken}; HttpOnly; Path=/; SameSite=Lax`
      ]);
//	 localStorage.setItem('accessToken', accessToken)
//	console.log('localStorage');
//	console.log(localStorage.getItem('accessToken'));
    
      res.status(200).json({ success: true });
      
  }
  
