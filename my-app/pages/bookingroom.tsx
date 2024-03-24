// pages/booking.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Booking.module.css'; // Make sure to create this CSS module

const Booking = () => {
    const [bookingDetails, setBookingDetails] = useState(() => {
        if (typeof window !== 'undefined') {
            // โค้ดนี้จะทำงานเฉพาะในเบราว์เซอร์
            const savedBooking = sessionStorage.getItem('bookingDetails');
            return savedBooking ? JSON.parse(savedBooking) : { roomType: '', checkInDate: '', checkOutDate: '', fullName: '', phoneNumber: '', email: '' };
        }
        // สำหรับสภาพแวดล้อมที่ไม่ใช่เบราว์เซอร์, ใช้ค่าเริ่มต้น
        return { roomType: '', checkInDate: '', checkOutDate: '', fullName: '', phoneNumber: '', email: '' };
    });


  const router = useRouter();

  const formatDate = (date: Date | string) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  };

  const today = formatDate(new Date());

  interface BookingDetails {
    roomType: string;
    checkInDate: string;
    checkOutDate: string;
    fullName: string;
    phoneNumber: string;
    email: string;
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails:BookingDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };
  const handleSecurityAlert = () => {
    alert("คำเตือน: การพยายาม hack หรือเข้าถึงระบบโดยไม่ได้รับอนุญาตนั้นผิดกฎหมายและจะถูกดำเนินการตามกฎหมายที่เกี่ยวข้อง. กรุณาใช้เว็บไซต์นี้อย่างมีจริยธรรม.");
  }
  const sanitizeInput = (input: string): string => {
        // ตรวจสอบว่า input มีเนื้อหาที่อาจเป็น script หรือไม่
        if (/<script>/i.test(input)) {
            // แจ้งเตือนผู้ใช้
            handleSecurityAlert();
            throw new Error('Invalid input: script tags are not allowed.');
        }
        // ทำการ escape ค่าพิเศษที่อาจทำให้เกิดการโจมตี XSS
        return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
    const sanitizedDetails = {
        roomType: sanitizeInput(bookingDetails.roomType),
        checkInDate: sanitizeInput(bookingDetails.checkInDate),
        checkOutDate: sanitizeInput(bookingDetails.checkOutDate),
        fullName: sanitizeInput(bookingDetails.fullName),
        phoneNumber: sanitizeInput(bookingDetails.phoneNumber),
        email: sanitizeInput(bookingDetails.email)
    };

    
    const saveBookingDetails = (details:BookingDetails) => {
        const data = {
          ...details,
          expiry: Date.now() + 86400000 // อายุหมดอายุหลังจาก 24 ชั่วโมง (86400000 มิลลิวินาที)
        };
        localStorage.setItem('bookingDetails', JSON.stringify(data));
      };
      saveBookingDetails(sanitizedDetails)

    const getBookingDetails = () => {
    const data = localStorage.getItem('bookingDetails');
    if (data) {
        const bookingDetails = JSON.parse(data);
        // ตรวจสอบว่าข้อมูลหมดอายุหรือไม่
        if (Date.now() > bookingDetails.expiry) {
        localStorage.removeItem('bookingDetails'); // ลบข้อมูลหากหมดอายุ
        return null;
        }
        return bookingDetails;
    }
    return null;
    };
      

    router.push({
      pathname: 'confirmbook',
      query: { ...sanitizedDetails },
    })
    } catch (error) {
        console.error('Error:', error);
        router.push('/'); // Redirect ในกรณีมีข้อผิดพลาด
      }
  };

  return (
    <>
      <div className={styles.bookingFormContainer}>
      <div className={styles.logoContainer}>
            <img src="BAAn RIM NAM(1).png" alt="Logo" />
        </div>
        <h1>จองบ้านพัก</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="roomType">ประเภทบ้าน:<span className={styles.required}>*</span></label>
          <select id="roomType" name="roomType" value={bookingDetails.roomType} onChange={handleChange} required>
            <option value="">เลือกประเภท</option>
            <option value="roomtype1">1-2ท่าน</option>
            <option value="roomtype2">3-4ท่าน</option>
            <option value="roomtype3">1 ครอบครัว</option>
          </select>

          <label htmlFor="checkInDate">วันที่เข้าที่พัก(Check in):<span className={styles.required}>*</span></label>
          <input type="date" 
                id="checkInDate" 
                name="checkInDate" 
                value={bookingDetails.checkInDate} 
                onChange={handleChange}
                min={today}  
                required/>

          <label htmlFor="checkOutDate">วันที่ออกจากที่พัก (Check out):<span className={styles.required}>*</span></label>
          <input type="date" 
                id="checkOutDate" 
                name="checkOutDate" 
                value={bookingDetails.checkOutDate} 
                onChange={handleChange} 
                min={today}
                required/>

          <label htmlFor="fullName">ชื่อ-นามสกุล:<span className={styles.required}>*</span></label>
          <input type="text" 
                id="fullName" 
                name="fullName" 
                value={bookingDetails.fullName} 
                onChange={handleChange} 
                required/>

          <label htmlFor="phoneNumber">เบอร์โทรติดต่อ:<span className={styles.required}>*</span></label>
          <input type="tel" 
                id="phoneNumber" 
                name="phoneNumber" 
                value={bookingDetails.phoneNumber} 
                onChange={handleChange} 
                required
                pattern="[0-9]{10}" />

          <label htmlFor="email">Email:<span className={styles.required}>*</span></label>
          <input type="email" 
                id="email" 
                name="email" 
                value={bookingDetails.email} 
                onChange={handleChange} 
                required/>

          <button type="submit">ยืนยัน</button>
        </form>
      </div>
    </>
  );
};

export default Booking;


    // ส่งข้อมูลไปยัง API endpoint ของคุณ
    // const response = await fetch('/api/booking', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(sanitizedDetails),
    //   });
  
    //   if (!response.ok) {
    //     throw new Error('Something went wrong');
    //   }
  
    //   // สมมติว่าเซิร์ฟเวอร์ตอบกลับด้วย URL ของหน้ายืนยันการจอง
    //   const { confirmationUrl } = await response.json();
  
    //   // Redirect ไปยังหน้ายืนยันการจอง
    //   router.push(confirmationUrl);