// นำเข้า useRouter และ useState, useEffect และแบบข้อมูล ReactNode
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState, useEffect, ReactNode } from 'react';
import styles from '../styles/HeaderBar.module.css';

// อาจจำเป็นต้องปรับปรุง types ให้ตรงกับความต้องการของโปรเจกต์คุณ
interface NavLinkProps {
  href: string;
  children: ReactNode;
}

// Component สำหรับ NavLink เพื่อตรวจสอบ active link
const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  // ปรับแต่ง class หรือ style เมื่อ link active ได้ที่นี่
  const linkStyle = isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

  return (
    <Link href={href} className={linkStyle}>
      {children}
    </Link>
  );
};

const HeaderBar: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenUser, setIsDropdownOpenUser] = useState(false);

  useEffect(() => {
    // ฟังก์ชัน async สำหรับตรวจสอบสถานะการยืนยันตัวตน
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/checkAuth', {
          method: 'GET',
          credentials: 'include', // สำคัญสำหรับการส่ง cookie ใน request
        });
        const data = await res.json();
  
        if (data.isLoggedIn && data.role === "User") {
          setIsLoggedIn(true);
          // ตั้งค่าอื่น ๆ ตามความจำเป็น
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking auth status", error);
        setIsLoggedIn(false);
      }
    };
  
    checkAuth();
  }, []);
  


  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleDropdownUser = () => setIsDropdownOpenUser(!isDropdownOpenUser);

  const handleLogout = async () => {
    try {
      // Call API endpoint to logout
      await fetch('../api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setIsLoggedIn(false);
      router.push('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };
  

  return (
    <header className={styles.headerBar}>
      <div className={styles.logo}>
        <img src="/BAAn RIM NAM(1).png" alt="Logo" />
      </div>
      <nav className={styles.navLinks}>
        <NavLink href="/">หน้าหลัก</NavLink>
        <div onClick={toggleDropdown} className={styles.dropdown}>
          <NavLink href="">ประเภทบ้านพัก▼</NavLink>
          {isDropdownOpen && (
            <div className={styles.dropdownContent}>
              <Link href="/typeroom/type1">สำหรับพัก 1-2 ท่าน</Link>
              <Link href="/typeroom/type2">สำหรับพัก 3-4 ท่าน</Link>
              <Link href="/typeroom/type3">สำหรับพัก 1 ครอบครัว</Link>
            </div>
          )}
        </div>
        <NavLink href="/promotion">โปรโมชั่น</NavLink> 
        <NavLink href="/location">สถานที่รอบๆ</NavLink>
        <NavLink href="/contactus">ติดต่อเรา</NavLink>
      </nav>
      {isLoggedIn ? (
      <div onClick={toggleDropdownUser} className={styles.profilePicContainer}>
        <img src='/icon/user.png' alt="Profile" className={styles.profilePic} />   
        {isDropdownOpenUser && (
          <div className={styles.dropdownContent}>
            <Link href="/profile">โปรไฟล์</Link>
            <Link href="/BookingStatusPage">ติดตามการจอง</Link>
            <button onClick={handleLogout} className={styles.logoutButton}>
              ออกจากระบบ
            </button>
          </div>
        )}
      </div>
    ) : (
      <button onClick={() => router.push('/login')} className={styles.loginButton}>
        เข้าสู่ระบบ
      </button>
    )}
    </header>
  );
};

export default HeaderBar;
