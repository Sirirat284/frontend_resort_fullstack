// pages/confirmBooking.tsx
import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/ConfirmBooking.module.css'; // แน่ใจว่าได้สร้าง CSS module ตามโค้ดที่ให้ไป

const ConfirmBooking = () => {
    const router = useRouter();
    const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails') || '{}');
  
    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) {
          // ถ้าไม่มี dateString, คืนค่าว่างหรือข้อความที่บอกว่าไม่มีข้อมูล
          return "ไม่มีข้อมูล";
        }
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('th-TH', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(date);
      };
  
    const handleConfirm = () => {
      console.log('Booking confirmed');
      router.push('/payment'); // สมมติว่ามีหน้าการชำระเงิน
    };
  
    return (
      <div className={styles.confirmationContainer}>
        <div className={styles.logoContainer}>
          <img src="BAAn RIM NAM(1).png" alt="Logo" />
        </div>
        <h2>ยืนยันการจอง</h2>
        <p className={styles.confirmationDetail}>ประเภทบ้าน: {bookingDetails.roomType}</p>
        <p className={styles.confirmationDetail}>วันที่เข้าพัก: {formatDate(bookingDetails.checkInDate as string)}</p>
        <p className={styles.confirmationDetail}>วันที่ออกจากที่พัก: {formatDate(bookingDetails.checkOutDate as string)}</p>
        <p className={styles.confirmationDetail}>ชื่อ-นามสกุล: {bookingDetails.fullName}</p>
        <p className={styles.confirmationDetail}>เบอร์โทรติดต่อ: {bookingDetails.phoneNumber}</p>
        <p className={styles.confirmationDetail}>Email: {bookingDetails.email}</p>
        <button className={styles.confirmButton} onClick={handleConfirm}>ยืนยันและชำระเงิน</button>
      </div>
    );
  };
  

export default ConfirmBooking;
