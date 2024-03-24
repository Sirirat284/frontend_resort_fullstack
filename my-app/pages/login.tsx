import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
import Head from 'next/head';
import styles from '../styles/login.module.css';
import Link from 'next/link';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const [message, setMessage] = useState(''); // สถานะสำหรับข้อความที่จะแสดง
  const [messageColor, setMessageColor] = useState(''); // สถานะสำหรับสีของข้อความ

  const validateEmail = (email: string) => {
   
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
        setError('Invalid email format');
        return;
    }

    if (!validatePassword(password)) {
        setError('Password must be at least 8 characters long');
        return;
    }

    try {
        const response = await axios.post('http://localhost:3000/login', {
          email: email,
          password: password,
        });
  
        if (response.status === 200) {
          // ถ้า response status เป็น 200, แสดงข้อความ "Hello" ด้วยสีเขียว
          setMessage('Hello');
          setMessageColor('green');
          setError(''); // รีเซ็ตข้อความผิดพลาด
          // router.push('/'); // นำทางไปยังหน้าหลัก หรือหน้าที่ต้องการ
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          // ถ้ามีข้อผิดพลาด, แสดงข้อความผิดพลาด
          setError(error.response.data.message);
          setMessage(''); // รีเซ็ตข้อความ hello
        }
      }
};
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
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
                        {error && <div className={styles.error}>{error}</div>}
                        {message && <div style={{ color: messageColor }}>{message}</div>}
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
                    </form>`
                </div>
            </div>
        </>
    );
}

export default Login;
