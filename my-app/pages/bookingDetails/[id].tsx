import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from '../../components/HeaderBar'; 
import Footer from '../../components/Footer';
import styles from '../../styles/BookingDetails.module.css';


const BookingDetails = () => {
    const router = useRouter();
    const { id } = router.query; // ดึงรหัสการจองจาก URL

    const [bookingDetails, setBookingDetails] =  useState({
        statuscodo: "",
        customerName: "",
        bookingDate: "",
        checkInDate: "",
        checkOutDate: "",
        status: ""
    });
    

    useEffect(() => {
        // ตัวอย่างการใช้งาน id
        setBookingDetails(prevDetails => ({
            ...prevDetails,
            id: id, // ตรวจสอบว่า 'id' มีค่าถูกต้อง
            statuscodo: "qwertyuio",
            customerName: "สมชาย ดีมาก",
            bookingDate: "2023-04-01",
            checkInDate: "2023-04-10",
            checkOutDate: "2023-04-15",
            status: "Confirmed"
        }));        
    }, [id]); // อัพเดทเมื่อ ID เปลี่ยน

    if (!bookingDetails) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Header/>
            <div className={styles.pageContainer}>
                <div className={styles.detailsContainer}>
                    <h1 className={styles.detailsHeader}>รายละเอียดการจอง</h1>
                    <p className={styles.detailItem}>รหัสการจอง: <span>{bookingDetails.statuscodo}</span></p>
                    <p className={styles.detailItem}>ชื่อลูกค้า: <span>{bookingDetails.customerName}</span></p>
                    <p className={styles.detailItem}>วันที่จอง: <span>{bookingDetails.bookingDate}</span></p>
                    <p className={styles.detailItem}>วันที่เข้าพัก: <span>{bookingDetails.checkInDate}</span></p>
                    <p className={styles.detailItem}>วันที่ออก: <span>{bookingDetails.checkOutDate}</span></p>
                    <p className={styles.detailItem}>สถานะ: <span>{bookingDetails.status}</span></p>
                    </div>
                    <div className={styles.footerContainer}>
                        <Footer />
                    </div>
            </div>
        </>
    );
};

export default BookingDetails;
