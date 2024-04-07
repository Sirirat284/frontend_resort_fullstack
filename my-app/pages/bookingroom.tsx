// pages/booking.tsx
import React, { useState , useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Booking.module.css'; // Make sure to create this CSS module
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { user_auth } from '../hooks/userAuth';
import { sanitizeInput } from '../units/security';

const MySwal = withReactContent(Swal);

interface BookingDetails {
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  quantity:string,
  fullName: string;
  phoneNumber: string;
  email: string;
}

const Booking = () => {
    user_auth();
    const router = useRouter();
    const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
      roomType: '', 
      checkInDate: '', 
      checkOutDate: '', 
      quantity:'',
      fullName: '', 
      phoneNumber: '', 
      email: ''
  });

  const [roomAvailability, setRoomAvailability] = useState({
    'สำหรับ 1-2 ท่าน': 3, // สมมติว่ามีห้องประเภทนี้ 5 ห้อง
    'สำหรับ 3-4 ท่าน': 2, // สมมติว่ามีห้องประเภทนี้ 3 ห้อง
    'สำหรับ 1 ครอบครัว': 2, // สมมติว่ามีห้องประเภทนี้ 2 ห้อง
  });



  const renderQuantityOptions = (type: string) => {
    const options = [];
    const maxQuantity = roomAvailability[type as keyof typeof roomAvailability] || 0;
    for (let i = 1; i <= maxQuantity; i++) {
        options.push(<option key={i} value={i.toString()}>{i}</option>);
    }
    return options;
};

  const getBookingDetails = (): BookingDetails | null => {
    const data = localStorage.getItem('bookingDetails');
    if (data) {
      const parsedData = JSON.parse(data);
      // Check if the data is expired
      if (Date.now() > parsedData.expiry) {
        localStorage.removeItem('bookingDetails'); // Remove data if expired
        return null;
      }
      return parsedData; // Return data if not expired
    }
    return null; // Return null if no data
  };

  useEffect(() => {
    const storedDetails = getBookingDetails(); // สมมติว่านี่คือฟังก์ชันที่ใช้โหลดข้อมูลการจองจาก localStorage
    if (storedDetails) {
        setBookingDetails(storedDetails);
    }
}, []);

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

  const saveBookingDetails = (details: BookingDetails) => {
    const data = {
      ...details,
      expiry: Date.now() + 86400000, // 24 hours in milliseconds
    };
    localStorage.setItem('bookingDetails', JSON.stringify(data));
  };
  
  // Function to get booking details from localStorage


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingDetails(prevDetails => ({
        ...prevDetails,
        [name]: value
    }));
};



const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const sanitizedDetails = {
      roomType: sanitizeInput(bookingDetails.roomType),
      checkInDate: sanitizeInput(bookingDetails.checkInDate),
      checkOutDate: sanitizeInput(bookingDetails.checkOutDate),
      quantity:bookingDetails.quantity,
      fullName: sanitizeInput(bookingDetails.fullName),
      phoneNumber: sanitizeInput(bookingDetails.phoneNumber),
      email: sanitizeInput(bookingDetails.email),
    };

    // Save sanitized booking details to localStorage
    saveBookingDetails(sanitizedDetails);

    // Redirect user to the confirmation page with sanitized details
    router.push({
      pathname: 'confirmbook',
      query: { ...sanitizedDetails },
    });
  } catch (error) {
    console.error('Error:', error);
    router.push('/'); // Redirect to home on error
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
          <option value="สำหรับ 1-2 ท่าน">1-2ท่าน</option>
          <option value="สำหรับ 3-4 ท่าน">3-4ท่าน</option>
          <option value="สำหรับ 1 ครอบครัว">1 ครอบครัว</option>
        </select>

        <label htmlFor="quantity">จำนวนห้อง:<span className={styles.required}>*</span></label>
        <select id="quantity" name="quantity" value={bookingDetails.quantity} onChange={handleChange} required>
          <option value="">เลือกจำนวน</option>
          {bookingDetails.roomType && renderQuantityOptions(bookingDetails.roomType)}
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