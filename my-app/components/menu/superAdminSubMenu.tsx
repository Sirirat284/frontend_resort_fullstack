import { useState } from 'react';
import styles from '../../styles/superadmin/MenuButton.module.css';
import BookingStats from '../../pages/rimnamadmin/superAdmin/BookingStats';
import RevenueStats from '../../pages/rimnamadmin/superAdmin/RevenueStats';

const MenuButton = () => {
  // State to keep track of which content is active
  const [activeContent, setActiveContent] = useState('bookingStats');

  const handleNavigation = (contentKey:string) => {
    // Update the active content based on the button clicked
    setActiveContent(contentKey);
  };

  return (
    <>
      <div className={styles.menuContainer}>
        <button
          onClick={() => handleNavigation('bookingStats')}
          className={`${styles.menuItem} ${activeContent === 'bookingStats' ? styles.active : ''}`}
        >
          สถิติการจอง
        </button>
        <button
          onClick={() => handleNavigation('income')}
          className={`${styles.menuItem} ${activeContent === 'income' ? styles.active : ''}`}
        >
          รายได้
        </button>
        {/* Add more buttons as needed */}
      </div>
      <div className={styles.contentDisplay}>
        {activeContent === 'bookingStats' && (
          <div>
            <BookingStats/>
          </div>
        )}
        {activeContent === 'income' && (
          <div>
            <RevenueStats/>
          </div>
        )}
        {/* Add more conditionals for other content as needed */}
      </div>
    </>
  );
};

export default MenuButton;
