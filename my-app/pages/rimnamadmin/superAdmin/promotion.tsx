import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../../components/admin/Header';
import Menu from '../../../components/menu/superadmin';
import styles from '../../../styles/superadmin/BookingStats.module.css';

interface Promotion {
  id: number;
  image: string;
  title: string;
  details: string;
  startDate: string;
  endDate: string;
}

const MonitorPromotions = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([
    // ตัวอย่างข้อมูลโปรโมชั่น
    { id: 1, image: 'https://ik.imagekit.io/seproject/DALL_E%202024-01-04%2010.13.45%20-%20A%20vibrant%20and%20engaging%20image%20depicting%20the%20activity%20of%20walking%20through%20a%20durian%20orchard.%20The%20image%20should%20capture%20the%20essence%20of%20a%20guided%20tour%20through.png?updatedAt=1711145598320',
             title: 'Summer Sale', details: 'Up to 50% off!', startDate: '2024-06-01', endDate: '2024-06-30' },
    { id: 2, image: 'https://ik.imagekit.io/seproject/DALL_E%202024-01-04%2010.04.30%20-%20A%20realistic%20and%20detailed%20image%20of%20the%20grounds%20of%20a%20resort%20located%20near%20a%20river,%20enveloped%20by%20a%20lush%20forest%20with%20a%20wide,%20open%20lawn.%20The%20resort%20should%20b.png?updatedAt=1711145598490', 
             title: 'Winter Special', details: 'Save on winter getaways!', startDate: '2024-12-01', endDate: '2024-12-31' },
    // เพิ่มโปรโมชั่นอื่นๆ ตามต้องการ
  ]);
  const router = useRouter(); // Hook useRouter

  const handleDelete = (id:number) => {
    const updatedPromotions = promotions.filter(promotion => promotion.id !== id);
    setPromotions(updatedPromotions);
  };

  return (
    <>
    <Header />
      <Menu />
      <div className={styles.dateFilterContainer}>
        <button onClick={() => router.push('AddPromotion')}>เพิ่มโปรโมชั่น</button>
      </div>
      <div className={styles.statsContainer}>
        <table className={styles.bookingTable}>
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>รูปภาพโปรโมชั่น</th>
              <th>หัวข้อโปรโมชั่น</th>
              <th>รายละเอียด</th>
              <th>วันที่เริ่ม</th>
              <th>วันที่สิ้นสุด</th>
              <th>การดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((promotion, index) => (
              <tr key={promotion.id}>
                <td>{index + 1}</td>
                <td className="tableCellImage">
                    <img src={promotion.image} alt={promotion.title} className={styles.tableCellImageimg} />
                </td>
                <td>{promotion.title}</td>
                <td>{promotion.details}</td>
                <td>{promotion.startDate}</td>
                <td>{promotion.endDate}</td>
                <td>
                  <button className={styles.deleteButton} onClick={() => handleDelete(promotion.id)}>ลบ</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MonitorPromotions;
