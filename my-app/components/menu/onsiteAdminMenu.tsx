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
        onClick={() => handleNavigation('/rimnamadmin/onsiteAdmin/')}
        className={`${styles.menuItem} ${router.pathname === '/rimnamadmin/onsiteAdmin' ? styles.active : ''}`}>
            check in
      </button>
      <button
        onClick={() => handleNavigation('/rimnamadmin/onsiteAdmin/checkOut')}
        className={`${styles.menuItem} ${router.pathname === '/rimnamadmin/onsiteAdmin/checkOut' ? styles.active : ''}`}>
            check out
      </button>
      <button
        onClick={() => handleNavigation('/rimnamadmin/onsiteAdmin/monitorHome')}
        className={`${styles.menuItem} ${router.pathname === '/rimnamadmin/onsiteAdmin/monitorHome' ? styles.active : ''}`}>
            บ้านพัก
      </button>
    
    </div>
  );
};

export default MenuButton;
