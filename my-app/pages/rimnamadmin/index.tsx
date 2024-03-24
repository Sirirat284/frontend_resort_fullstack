// pages/admin/login.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/AdminLogin.module.css';

interface LoginResponse {
  success: boolean;
  token: string; // หรือข้อมูลอื่นๆ ที่จำเป็น
  role: string;
}

const AdminLogin = () => {
  const [adminName, setAdminName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginData = { adminName, password };

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data: LoginResponse = await response.json();

      if (data.success && data.role === 'admin') {
        // บันทึก token ไว้ใน localStorage หรือ cookie
        // Redirect ไปยังหน้า dashboard ของ admin
        router.push('/admin/dashboard');
      } else {
        // แสดงข้อความเมื่อ login ไม่สำเร็จ
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <>
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.logo}>
          <img src="BAAn RIM NAM(1).png" alt="Logo" />
        </div>
        <h2 className={styles.formTitle}>เข้าสู่ระบบ Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="adminName">Admin Name:</label>
            <input
              type="text"
              id="adminName"
              className={styles.inputField}
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.formAction}>
            <button type="submit" className={styles.submitButton}>เข้าสู่ระบบ</button>
          </div>
        </form>
      </div>
    </div>
  </>
  );
};

export default AdminLogin;
