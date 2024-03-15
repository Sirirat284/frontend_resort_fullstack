import React from 'react';
import styles from '../styles/Footer.module.css'; // สมมติว่าคุณมีไฟล์ CSS module สำหรับ styling

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <img src="/BAAn RIM NAM(1).png" alt="Logo" className={styles.logo}/>
      </div>
        <div className={styles.links}>
          <a href="#">หน้าหลัก</a>
          <a href="#">ประเภทบ้านพัก</a>
          <a href="#">ประชุม&จัดเลี้ยง</a>
          <a href="#">โปรโมชั่น</a>
          <a href="#">สถานที่รอบๆ</a>
          <a href="#">ติดต่อเรา</a>
        </div>
        <p className={styles.colortext}>© 2008 - Company, Inc. All rights reserved. Address Address</p>
    </footer>
  );
}

export default Footer;
