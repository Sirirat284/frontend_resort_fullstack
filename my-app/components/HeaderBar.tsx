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

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      setProfilePic("/icons8-glyph-96.png");
    }
  }, []);

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
        <img src={profilePic} alt="Profile" className={styles.profilePic} />
      ) : (
        <button onClick={() => router.push('/login')} className={styles.loginButton}>
          เข้าสู่ระบบ
        </button>
      )}
    </header>
  );
};

export default HeaderBar;
