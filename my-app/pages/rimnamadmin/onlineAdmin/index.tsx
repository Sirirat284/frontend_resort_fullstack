import React, { useState, useEffect } from 'react';
import Header from '../../../components/admin/Header';
import Menu from '../../../components/menu/onlineAdminMenu';
import styles from '../../../styles/superadmin/BookingStats.module.css';
import { OL_ad_auth } from '../../../hooks/adminAuth';
import axios from 'axios';
import Swal from 'sweetalert2';

interface Booking {
  headID: number;
  roomTypeID: string;
  roomTypeName: string;
  checkInDate: string;
  checkOutDate: string;
  fullName: string;
  tel: string;
  Email: string;
  remaining : number;
  pathpaymentSlip: string;
  results:number;
}

const BookingPage = () => {
  OL_ad_auth();
  const [bookings, setBookings] = useState<Booking[]>([]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get<Booking[]>(`${process.env.BACKEND_PATH}/monitornewreserve`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };
  
  useEffect(() => {
    fetchBookings();
  }, []);

  const handleApproval = async (headID: number, isApproved: boolean) => {
    
    try {
      // สร้าง URL จากตัวแปรสภาพแวดล้อม
      const url = `${process.env.BACKEND_PATH}/updateResevesStatus`;
  
      // ส่งคำขอ POST โดยใช้ fetch
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // กำหนดประเภทของเนื้อหาที่ส่งไป
        },
        body: JSON.stringify({
          headID, // ส่ง headID เป็น ID ของการจอง
          status: isApproved ? 'จองสำเร็จ' : 'จองไม่สำเร็จ', // ส่งสถานะการอนุมัติ
        }),
        credentials: 'include', // สำหรับส่ง cookies ถ้าจำเป็น
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Update success:', data);
        // แสดง SweetAlert
        Swal.fire({
          title: 'สำเร็จ!',
          text: `Booking ${headID} has been ${isApproved ? 'approved' : 'not approved'}.`,
          icon: 'success',
          timer: 1000, // ตั้งเวลาปิดอัตโนมัติหลังจาก 1 วินาที
          showConfirmButton: false,
        }).then(() => {
          fetchBookings(); // เรียกฟังก์ชัน fetchBookings หลังจาก alert ปิด
        });
      } else {
        console.error('Update failed with status:', response.status);
        Swal.fire('ผิดพลาด!', 'Failed to update the booking status.', 'error');
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      Swal.fire('ผิดพลาด!', 'Error occurred while updating the booking status.', 'error');
    }
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
            <th className={styles.tableHeader}>การอนุมัติ</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking,index) => (
            <tr key={booking. headID} className={styles.tableRow}>
              <td className={styles.tableData}>{index + 1}</td>
              <td className={styles.tableData}>{booking.roomTypeName}</td>
              <td className={styles.tableData}>{booking.checkInDate}</td>
              <td className={styles.tableData}>{booking.checkOutDate}</td>
              <td className={styles.tableData}>{booking.fullName}</td>
              <td className={styles.tableData}>{booking.tel}</td>
              <td className={styles.tableData}>{booking.Email}</td>
              <td className={styles.tableData}>
                <img src={booking.pathpaymentSlip} alt="Payment Slip" className={styles.tableCellslip} />
              </td>
              <td className={styles.tableData}>
                <button className={styles.approveButton} onClick={() => handleApproval(booking. headID, true)}>อนุมัติ</button>
                <button className={styles.declineButton} onClick={() => handleApproval(booking. headID, false)}>ไม่อนุมัติ</button>
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
