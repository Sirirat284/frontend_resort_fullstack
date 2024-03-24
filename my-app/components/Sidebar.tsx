import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Sidebar.module.css'; // อัปเดตเส้นทางไฟล์ CSS ของคุณ

const Sidebar = () => {
  const router = useRouter();

  // ฟังก์ชันเพื่อตรวจสอบว่า path ปัจจุบันตรงกับลิงก์หรือไม่
  const isActive = (path: string): string => {
    return router.pathname === path ? styles.active : '';
  };
  

  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebarList}>
        <li className={`${styles.sidebarItem} ${isActive('/profile')}`}>
          <Link href="/profile">
            โปรไฟล์
          </Link>
        </li>
        <li className={`${styles.sidebarItem} ${isActive('/BookingStatusPage')}`}>
          <Link href="/BookingStatusPage">
            ตรวจสอบการจอง
          </Link>
        </li>
        <li className={`${styles.sidebarItem} ${isActive('/booking-history')}`}>
          <Link href="/booking-history">
            ประวัติการจอง
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
