import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/ConfirmBooking.module.css';
import { loadStripe } from '@stripe/stripe-js';
import { user_auth } from '../hooks/userAuth';
import Image from 'next/image';
import Swal from 'sweetalert2';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface BookingDetails {
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  quantity: string;
  fullName: string;
  phoneNumber: string;
  email: string;
}

const ConfirmBooking = () => {
  user_auth();
  const router = useRouter();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    roomType: '',
    checkInDate: '',
    checkOutDate: '',
    quantity: '',
    fullName: '',
    phoneNumber: '',
    email: ''
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // โหลดข้อมูลการจองจาก localStorage
  useEffect(() => {
    const details = getBookingDetails();
    if (details) {
      setBookingDetails(details);
    }
  }, []);

  const getBookingDetails = (): BookingDetails | null => {
    const data = localStorage.getItem('bookingDetails');
    if (data) {
      return JSON.parse(data);
    }
    return null;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
        setSelectedFile(file); // อัปเดตไฟล์ที่เลือก
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) {
      return "ไม่มีข้อมูล"; // If there's no dateString, return a default message
    }
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('th-TH', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // ป้องกันการรีโหลดหน้าเว็บ

    if (!selectedFile || !bookingDetails) {
      console.log('No file or booking details to submit');
      return;
    }
    
    const formData = new FormData();
    
    // Append the file
    formData.append("file", selectedFile);
    
    // Append each booking detail individually
    Object.keys(bookingDetails).forEach((key) => {
      // Ensure TypeScript understands `key` as a valid key of `BookingDetails`
      const detailKey = key as keyof BookingDetails;
      const detailValue = bookingDetails[detailKey];
      // Convert undefined values to an empty string to avoid runtime errors
      formData.append(detailKey, detailValue ?? "");
    });
    
    try {
      const response = await fetch(`${process.env.BACKEND_PATH}/reserveRoom`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          title: 'สำเร็จ!',
          text: 'การจองของคุณได้รับการยืนยัน',
          icon: 'success',
          confirmButtonText: 'ตกลง',
          timer: 2000, // ตั้งเวลาให้ปิดหลังจาก 2000 มิลลิวินาที
          timerProgressBar: true, // แสดงแถบความคืบหน้าของเวลา
          didClose: () => {
            router.push('/'); // เปลี่ยนหน้าหลังจาก alert ปิด
          }
        });
      } else {
        Swal.fire({
          title: 'ผิดพลาด!',
          text: 'เกิดข้อผิดพลาดในการส่งข้อมูล',
          icon: 'error',
          confirmButtonText: 'ตกลง'
        });
      }
    } catch (error) {
      // จัดการข้อผิดพลาดในการส่งข้อมูล
      console.error('Error submitting form', error);
      alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
    }
  };


  return (
    <div className={styles.confirmationContainer}>
      <div className={styles.logoContainer}>
        <img src="BAAn RIM NAM(1).png" alt="Logo" />
      </div>
      <h2>ยืนยันการจอง</h2>
      <p className={styles.confirmationDetail}>ประเภทบ้าน: {bookingDetails.roomType}</p>
      <p className={styles.confirmationDetail}>จำนวน: {bookingDetails.quantity}</p>
      <p className={styles.confirmationDetail}>วันที่เข้าพัก: {formatDate(bookingDetails.checkInDate)}</p>
      <p className={styles.confirmationDetail}>วันที่ออกจากที่พัก: {formatDate(bookingDetails.checkOutDate)}</p>
      <p className={styles.confirmationDetail}>ชื่อ-นามสกุล: {bookingDetails.fullName}</p>
      <p className={styles.confirmationDetail}>เบอร์โทรติดต่อ: {bookingDetails.phoneNumber}</p>
      <p className={styles.confirmationDetail}>Email: {bookingDetails.email}</p>
      <br></br>
      <h2>จ่ายค่าเช่าบ้านพัก</h2>
      <div className={styles.qrCodeContainer}>
        <Image src="/IMG_2972.JPG" alt="QR Code for Payment" width={300} height={300} />
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="payment-slip-upload">อัปโหลดสลิปการชำระเงิน:</label>
        <input type="file" id="payment-slip-upload" accept="image/*" onChange={handleImageUpload} />
        {imagePreviewUrl && (
          <div className={styles.uploadedImagePreview}>
            <img src={imagePreviewUrl} alt="Uploaded Payment Slip" />
          </div>
        )}
        <button type="submit" className={styles.submitButton}>ยืนยันการจอง</button>
      </form>
    </div>
  );
};

  

export default ConfirmBooking;




