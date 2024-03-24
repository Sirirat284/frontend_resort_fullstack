import { useRouter } from 'next/router';
import styles from '../../styles/superadmin/SuperAdminmenu.module.css';

const MenuButton = () => {
  const router = useRouter();

  // ระบุประเภทของ path เป็น string
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.menuContainer}>
      <button
        onClick={() => handleNavigation('/rimnamadmin/superAdmin/')}
        className={`${styles.menuItem} ${router.pathname === '/rimnamadmin/superAdmin' ? styles.active : ''}`}>
            รายงาน
      </button>
      <button
        onClick={() => handleNavigation('/rimnamadmin/superAdmin/monitorHome')}
        className={`${styles.menuItem} ${router.pathname === '/rimnamadmin/superAdmin/monitorHome' ? styles.active : ''}`}>
            บ้านพัก
      </button>
      <button
        onClick={() => handleNavigation('/rimnamadmin/superAdmin/monitorAdmin')}
        className={`${styles.menuItem} ${router.pathname === '/rimnamadmin/superAdmin/monitorAdmin' ? styles.active : ''}`}>
            Admins
      </button>
      <button
        onClick={() => handleNavigation('/rimnamadmin/superAdmin/promotion')}
        className={`${styles.menuItem} ${router.pathname === '/rimnamadmin/superAdmin/promotion' ? styles.active : ''}`}>
            โปรโมชั่น
      </button>
    
    </div>
  );
};

export default MenuButton;
