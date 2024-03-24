// components/Header.tsx
import React from 'react';
import Link from 'next/link';
import styles from '../../styles/HeaderAdmin.module.css'; // ตรวจสอบเส้นทางของไฟล์ CSS

const Header = () => {
  const handleLogout = () => {
    // รหัสสำหรับการออกจากระบบ, เช่น ล้างข้อมูลใน localStorage หรือ cookies
    console.log('Logging out...');
    // Redirect ไปยังหน้า login
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <Link href="/">
            <img src="/BAAn RIM NAM(1).png" alt="Logo" className={styles.logo} />
        </Link>
      </div>
      <div className={styles.adminTitle}>Admin</div>
      <div className={styles.logoutTextContainer}>
        <a onClick={handleLogout} className={styles.logoutText}>ออกจากระบบ</a>
      </div>
    </div>
  );
};

export default Header;
