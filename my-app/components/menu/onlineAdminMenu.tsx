import { useRouter } from 'next/router';
import React, { useState } from 'react';

import styles from '../../styles/superadmin/SuperAdminmenu.module.css';

const MenuButton = () => {
  const router = useRouter();
  const [activeContent, setActiveContent] = useState('bookingStats');

  // ระบุประเภทของ path เป็น string
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.menuContainer}>
      <button
        onClick={() => handleNavigation('/rimnamadmin/onlineAdmin/')}
        className={`${styles.menuItem} ${router.pathname === '/rimnamadmin/onlineAdmin' ? styles.active : ''}`}>
            การจองใหม่
      </button>
      <button
        onClick={() => handleNavigation('/rimnamadmin/onlineAdmin/monitorHome')}
        className={`${styles.menuItem} ${router.pathname === '/rimnamadmin/onlineAdmin/monitorHome' ? styles.active : ''}`}>
            บ้านพัก
      </button>
      <button
        onClick={() => handleNavigation('/rimnamadmin/onlineAdmin/promotion')}
        className={`${styles.menuItem} ${router.pathname === '/rimnamadmin/onlineAdmin/promotion' ? styles.active : ''}`}>
            โปรโมชั่น
      </button>
    
    </div>
  );
};

export default MenuButton;
