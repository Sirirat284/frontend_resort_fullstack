import React, { useState } from 'react';
import Header from '../../../components/admin/Header';
import Menu from '../../../components/menu/onlineAdminMenu';
import styles from '../../../styles/superadmin/BookingStats.module.css';

interface Booking {
  id: number;
  type: string;
  checkInDate: string;
  checkOutDate: string;
  fullName: string;
  phone: string;
  email: string;
  remaining : number;
  paymentSlip: string;
}

const BookingPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      type: "Single",
      checkInDate: "2023-04-01",
      checkOutDate: "2023-04-03",
      fullName: "John Doe",
      phone: "123-456-7890",
      email: "john@example.com",
      remaining: 3,
      paymentSlip: "https://ik.imagekit.io/seproject/IMG_2150.JPG?updatedAt=1711177060555"
    },
    {
      id: 1,
      type: "Single",
      checkInDate: "2023-04-01",
      checkOutDate: "2023-04-03",
      fullName: "John Doe",
      phone: "123-456-7890",
      email: "john@example.com",
      remaining: 3,
      paymentSlip: "https://ik.imagekit.io/seproject/IMG_2150.JPG?updatedAt=1711177060555"
    },
  ]);

  // ฟังก์ชันสำหรับอัปเดตสถานะการจอง
  const handleApproval = (id: number, isApproved: boolean) => {
    // อัปเดตสถานะการจองในนี้
    console.log(`Booking ${id} is ${isApproved ? 'approved' : 'not approved'}`);
    // เพิ่มโค้ดสำหรับอัปเดตสถานะการจองใน backend ที่นี่
  };

  return (
    <>
    <Header />
    <Menu/>
    <div className={styles.statsContainer}>
      <table className={styles.bookingTable}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>ลำดับ</th>
            <th className={styles.tableHeader}>ประเภท</th>
            <th className={styles.tableHeader}>วันที่เข้าพัก</th>
            <th className={styles.tableHeader}>วันที่ออก</th>
            <th className={styles.tableHeader}>ชื่อ-นามสกุล</th>
            <th className={styles.tableHeader}>เบอร์โทร</th>
            <th className={styles.tableHeader}>Email</th>
            <th className={styles.tableHeader}>รูปสลิปเงิน</th>
            <th className={styles.tableHeader}>จำนวนห้องคงเหลือ</th>
            <th className={styles.tableHeader}>การอนุมัติ</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking,index) => (
            <tr key={booking.id} className={styles.tableRow}>
              <td className={styles.tableData}>{index + 1}</td>
              <td className={styles.tableData}>{booking.type}</td>
              <td className={styles.tableData}>{booking.checkInDate}</td>
              <td className={styles.tableData}>{booking.checkOutDate}</td>
              <td className={styles.tableData}>{booking.fullName}</td>
              <td className={styles.tableData}>{booking.phone}</td>
              <td className={styles.tableData}>{booking.email}</td>
              <td className={styles.tableData}>
                <img src={booking.paymentSlip} alt="Payment Slip" className={styles.tableCellslip} />
              </td>
              <td className={styles.tableData}>{booking.remaining}</td>
              <td className={styles.tableData}>
                <button className={styles.approveButton} onClick={() => handleApproval(booking.id, true)}>อนุมัติ</button>
                <button className={styles.declineButton} onClick={() => handleApproval(booking.id, false)}>ไม่อนุมัติ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default BookingPage;
