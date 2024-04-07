import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/HeaderBar'; // อย่าลืมปรับเปลี่ยนเส้นทางการนำเข้าให้ถูกต้อง
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import styles from '../styles/BookingStatus.module.css'; // สมมติว่ามีการสร้างไฟล์ CSS นี้
import { user_auth } from '../hooks/userAuth';

interface BookingInfo {
  id: number;
  bookingDate: string;
  checkInDate: string;
  checkOutDate: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

// ตัวอย่างข้อมูลการจอง
const sampleBookings: BookingInfo[] = [
  { id: 1, bookingDate: '2023-03-20', checkInDate: '2023-04-01', checkOutDate: '2023-04-10', status: 'Confirmed' },
  // เพิ่มข้อมูลการจองตามจำนวนที่ต้องการ
];

const BookingStatusPage = () => {
  
  user_auth();

  const [bookings, setBookings] = useState<BookingInfo[]>(sampleBookings);
  const router = useRouter();

  useEffect(() => {
    // คุณอาจจะต้องเรียกข้อมูลการจองจากแบ็กเอนด์ที่นี่
  }, []);

  const handleRowClick = (bookingId: number) => {
    // ใช้ router.push เพื่อนำทางไปยังหน้ารายละเอียดการจอง พร้อมกับ id ของการจองที่เลือก
    router.push(`/bookingDetails/${bookingId}`);
  };

  return (
<>
    <Header/>
    <div className={styles.pageContainer}>
        <div className={styles.sidebarContainer}>
        <Sidebar />
        </div>
        <div className={styles.contentContainer}>
        <div className={styles.profileContainer}>
            <div className={styles.profileCard}>
                <div className={styles.profileHeader}>
                    {/* Add logo here */}
                    <h2>ตรวจสอบการจอง</h2>
                    <table className={styles.bookingTable}>
                        <thead>
                            <tr>
                            <th>ลำดับ</th>
                            <th>วันที่จอง</th>
                            <th>วันที่เข้าพัก</th>
                            <th>วันที่ออก</th>
                            <th>สถานะ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, index) => (
                            <tr key={booking.id} onClick={() => handleRowClick(booking.id)}>
                                <td>{index + 1}</td>
                                <td>{booking.bookingDate}</td>
                                <td>{booking.checkInDate}</td>
                                <td>{booking.checkOutDate}</td>
                                <td className={styles[`status${booking.status}`]}>
                                    {booking.status}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    </div>
    <Footer/>
    </>


  );
};

export default BookingStatusPage;
