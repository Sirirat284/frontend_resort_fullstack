import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
import Head from 'next/head';
import styles from '../styles/login.module.css';
import Link from 'next/link';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { sanitizeInput } from '../units/security';
import { FaGoogle } from 'react-icons/fa';


const MySwal = withReactContent(Swal);


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  async function hashData(data: string) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data: { ip } } = await axios.get('https://api.ipify.org?format=json');

    if (!validateEmail(email)) {
        setError('Invalid email format');
        return;
    }

    if (!validatePassword(password)) {
        setError('Password must be at least 8 characters long');
        return;
    }

    try {
      const hashedPassword = await hashData(password);
      const response = await axios.post(`${process.env.BACKEND_PATH}/login`, {
        email: sanitizeInput(email),
        password: sanitizeInput(hashedPassword),
        ip: ip,
      });

      if (response.status === 200 && response.data) {
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        // แทนที่การเก็บใน sessionStorage ด้วยการเรียกใช้ /api/saveTokens
        await axios.post('/api/saveTokens', { accessToken , refreshToken });

        // นำทางผู้ใช้ไปยังหน้าหลัก
        router.push('/');
      }  else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด!',
          text: 'เข้าสู่ระบบไม่สำเร็จ: โปรดตรวจสอบอีเมลหรือรหัสผ่านของคุณ',
        });
      }} catch (error) {
        MySwal.fire({
          title: 'เกิดข้อผิดพลาด!',
          text: 'โปรดตรวจสอบอีเมลหรือรหัสผ่านของคุณ',
          icon: 'error',
          confirmButtonText: 'ตกลง',
          customClass: {
              confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false
      });
      }
};
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.BACKEND_PATH}/auth/google`;
  };
    return (
        <>
            {/* <HeaderBar /> */}
            <div className={styles.container}>
                <Head>
                    <title>Login Page</title>
                </Head>
                <div className={styles.loginContainer}>
                    <div className={styles.logo}>
                        <img src="/BAAn RIM NAM(1).png" alt="Logo" />
                    </div>
                    <form className={styles.formGroup} onSubmit={handleLogin}> {/* ใช้ onSubmit ที่นี่ */}
    `                    <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="username@dodo.com"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <input
                            type={showPassword ? 'text' : 'password'} // ใช้ state showPassword สำหรับควบคุมการแสดง/ซ่อน password
                            id="password"
                            name="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <p>หากคุณยังไม่ได้สมัครสมาชิกคลิ๊กที่นี่ <Link href="/signup" className={styles.link}>สมัครสมาชิก</Link></p>
                        <div className={styles.formAction}>
                            <button type="submit" className={styles.loginButton}>เข้าสู่ระบบ</button> {/* ปุ่มนี้เป็น type="submit" */}
                        </div>
                    </form>
                    <div className={styles.dividerContainer}>
                      <div className={styles.dividerLine}></div>
                      <div className={styles.dividerText}>or</div>
                      <div className={styles.dividerLine}></div>
                    </div>
                    <div>
                    {/* เพิ่มปุ่มเข้าสู่ระบบด้วย Google */}
                    <button onClick={handleGoogleLogin} className={styles.loginButtonGoogle}>
                      <FaGoogle /> เข้าสู่ระบบด้วย Google
                    </button>
                  </div>
                </div>
            </div>
        </>
    );
}

export default Login;
