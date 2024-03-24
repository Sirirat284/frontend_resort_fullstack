import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../../components/admin/Header';
import Menu from '../../../components/menu/onsiteAdminMenu';
import styles from '../../../styles/superadmin/BookingStats.module.css';

interface Booking {
  id: number;
  bookingCode: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  guestName: string;
  phone: string;
  email: string;
}

const CheckInPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([
    // สมมติข้อมูลการจอง
    { id: 1, bookingCode: 'B001', roomType: 'Single', checkInDate: '2024-03-30', checkOutDate: '2024-04-02', guestName: 'John Doe', phone: '0123456789', email: 'johndoe@example.com' },
    // ข้อมูลการจองเพิ่มเติม...
  ]);
  const router = useRouter(); // Hook useRouter

  const handleAddDetails = (bookingId: number) => {
    // ฟังก์ชันสำหรับการกรอกรายละเอียดเพิ่มเติม
    console.log(`Adding details for booking ID: ${bookingId}`);
    // โค้ดสำหรับเปิดหน้าหรือโมดอลกรอกรายละเอียดเพิ่มเติม
  };

  return (
    <>
        <Header/>
        <Menu/>
        <div className={styles.dateFilterContainer}>
            <button onClick={() => router.push('AddPromotion')}>ลูกค้า walk in</button>
        </div>
        <div className={styles.statsContainer}>
        <table className={styles.bookingTable}>
            <thead>
            <tr>
                <th>ลำดับ</th>
                <th>รหัสการจอง</th>
                <th>ประเภทบ้านพัก</th>
                <th>วันที่เข้าพัก</th>
                <th>วันที่ออกจากที่พัก</th>
                <th>ชื่อผู้จอง</th>
                <th>เบอร์โทร</th>
                <th>Email</th>
                <th>การกรอกรายละเอียด</th>
            </tr>
            </thead>
            <tbody>
            {bookings.map((booking, index) => (
                <tr key={booking.id}>
                <td>{index + 1}</td>
                <td>{booking.bookingCode}</td>
                <td>{booking.roomType}</td>
                <td>{booking.checkInDate}</td>
                <td>{booking.checkOutDate}</td>
                <td>{booking.guestName}</td>
                <td>{booking.phone}</td>
                <td>{booking.email}</td>
                <td>
                    <button className={styles.detailsButton} onClick={() => handleAddDetails(booking.id)}>กรอกรายละเอียด</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </>
  );
};

export default CheckInPage;
