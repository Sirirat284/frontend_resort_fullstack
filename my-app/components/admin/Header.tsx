// components/Header.tsx
import { useRouter } from 'next/router';
import axios from 'axios';
import React,{useState} from 'react';
import Link from 'next/link';
import styles from '../../styles/HeaderAdmin.module.css'; // ตรวจสอบเส้นทางของไฟล์ CSS

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogout = async () => {
    try {
      // Call API endpoint to logout
      await fetch('../api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setIsLoggedIn(false);
      router.push('/rimnamadmin');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
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
