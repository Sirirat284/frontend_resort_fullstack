import React from 'react';
import Head from 'next/head';
import styles from '../styles/login.module.css';
import HeaderBar from '../components/HeaderBar'; // ตรวจสอบเส้นทางการ import ให้ถูกต้อง
import Footer from '../components/Footer';

const Login = () => {
    return (
        // ใช้ React Fragment เพื่อห่อหุ้ม elements
        <>
            <HeaderBar />
            <div className={styles.container}>
                <Head>
                    <title>Login Page</title>
                </Head>
                <div className={styles.loginContainer}>
                    <div className={styles.logo}>
                        <img src="/BAAn RIM NAM(1).png" alt="Logo" />
                    </div>
                    <form className={styles.formGroup}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="username@dodo.com" required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" required />
                        </div>
                        <div className={styles.formAction}>
                            <button type="submit" className={styles.loginButton}>เข้าสู่ระบบ</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Login;
