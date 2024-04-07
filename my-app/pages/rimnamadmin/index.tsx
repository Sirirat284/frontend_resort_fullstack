// pages/admin/login.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/AdminLogin.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import { sanitizeInput } from '../../units/security';

const MySwal = withReactContent(Swal);

interface LoginResponse {
  success: boolean;
  token: string; // หรือข้อมูลอื่นๆ ที่จำเป็น
  role: string;
}

const AdminLogin = () => {
  const [adminName, setAdminName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  const router = useRouter();

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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validatePassword(password)) {
        setError('Password must be at least 8 characters long');
        return;
    }


    try {
      const hashedPassword = await hashData(password);
      const { data } = await axios.post(`${process.env.BACKEND_PATH}/loginAdmin`, {
        AdminName: sanitizeInput(adminName),
        Password: sanitizeInput(hashedPassword),
      });

      if (data) {
        const { accessToken, refreshToken } = data;

        await axios.post('/api/saveTokens', { accessToken, refreshToken });
 
        const response = await axios.post('/api/verifyRoleAdmin', { token: accessToken });
        const role  = response.data.role;

        console.log(role)
        if (role === 'SuperAdmin') {
          router.push('/rimnamadmin/superAdmin');
        } else if (role === 'OnlineAdmin') {
          router.push('/rimnamadmin/onlineAdmin');
        } else if (role === 'OnsiteAdmin') {
          router.push('/rimnamadmin/onsiteAdmin');
        }
      }else {
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
