import React, { useState } from 'react';
import Header from '../../../components/admin/Header';
import Menu from '../../../components/menu/onsiteAdminMenu';
import styles from '../../../styles/superadmin/BookingStats.module.css';

// สมมติว่ามี interface สำหรับการจอง
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

// ตัวอย่างข้อมูลการจอง
const sampleBookings: Booking[] = [
    { id: 1, bookingCode: 'B001', roomType: 'Single', checkInDate: '2024-03-30', checkOutDate: '2024-04-02', guestName: 'John Doe', phone: '0123456789', email: 'johndoe@example.com' },
];

const CheckOutAdmin = () => {
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings);

  const handleCheckOut = (bookingId: number) => {
    // โลจิกสำหรับยืนยันการออกจากที่พัก
    console.log(`ยืนยันการออกจากที่พักสำหรับการจอง ID: ${bookingId}`);
    // อัปเดตสถานะการออกจากที่พักใน state และส่งข้อมูลไปยัง backend
  };

  return (
    <>
      <Header />
      <Menu />
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
              <th>การออกจากที่พัก</th>
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
                  <button className={styles.deleteButton} onClick={() => handleCheckOut(booking.id)}>
                    ยืนยันการออก
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CheckOutAdmin;
