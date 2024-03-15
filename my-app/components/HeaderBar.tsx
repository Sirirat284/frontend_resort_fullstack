import React from 'react';
import Link from 'next/link';
import styles from '../styles/HeaderBar.module.css'; // สมมติว่าคุณมีไฟล์ CSS module สำหรับ styling

const HeaderBar = () => {
  return (
    <header className={styles.headerBar}>
      <div className={styles.logo}>
        <img src="/BAAn RIM NAM(1).png" alt="Logo" />
      </div>
      <nav className={styles.navLinks}>
        <Link href="/">หน้าหลัก</Link>
        <Link href="/about">ประเภทบ้านพัก</Link>
        <Link href="/services">ประชุม&จัดเลี้ยง </Link> 
        <Link href="/contact">โปรโมชั่น</Link>
        <Link href="/contact">สถานที่รอบๆ</Link>
        <Link href="/contact">ติดต่อเรา</Link>
        {/* เพิ่มเติมลิงก์ของคุณที่นี่ */}
      </nav>
      <div>เข้าสู่ระบบ</div>
    </header>
  );
}

export default HeaderBar;
