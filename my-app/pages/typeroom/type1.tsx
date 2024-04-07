import React, { useState ,useEffect} from 'react';
import Link from 'next/link';
import styles from '../../styles/RoomType.module.css'; 
import Header from '../../components/HeaderBar';
import Footer from '../../components/Footer';

const RoomType = () => {
    const [checkInDate, setCheckInDate] = useState(new Date());
    const defaultCheckOutDate = new Date();
    defaultCheckOutDate.setDate(defaultCheckOutDate.getDate() + 1);
    const [checkOutDate, setCheckOutDate] = useState(defaultCheckOutDate);
    const [availableRooms, setAvailableRooms] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const userID = sessionStorage.getItem('userID');
      setIsLoggedIn(!!userID);
    }, []);

    useEffect(()=>{checkAvailability();},[])
    

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

      const checkAvailability = async () => {
        // Format date to 'yyyy-mm-dd'
        const formattedCheckInDate = formatDate(checkInDate);
        const formattedCheckOutDate = formatDate(checkOutDate);
      
        // Send request to your backend
        try {
            // สร้าง URL ที่มี query parameters
            const url = new URL(`${process.env.BACKEND_PATH}/checkAvailableRoom`, window.location.origin);
            url.searchParams.append('roomTypeID', "1");
            url.searchParams.append('checkInDate', formattedCheckInDate);
            url.searchParams.append('checkOutDate', formattedCheckOutDate);

            // ส่งข้อมูลไปยัง API บนเซิร์ฟเวอร์ โดยใช้ query parameters
            const response = await fetch(url, {
            method: 'GET', // ใช้ method GET
            headers: {
                'Content-Type': 'application/json',
            },
            // ไม่ต้องใช้ body เนื่องจากข้อมูลถูกส่งผ่าน query parameters
            });

            if (!response.ok) throw new Error('Failed to toggle room status');
          
            const data = await response.json();
            setAvailableRooms(data.availableRooms);
        } catch (error) {
          console.error("Error checking room availability:", error);
        }
      };

  return (
    <div className={styles.pageContainer}>
        <Header />
        <div className={styles.contentWrapper}>
            <div className={styles.roomTypeContainer}>
                <div className={styles.details}>
                    <h2>บ้านพัก สำหรับ 1-2 ท่าน</h2>
                    <h3>รายละเอียด</h3>
                    <p>บ้านพักที่เหมาะกับการอยู่ 1 - 2 ท่าน หรือ เหมาะกับครอบครัวขนาดเล็ก พร้อมด้วยสิ่งอำนวยความสะดวกครบครัน เหมาะกับการพักผ่อนที่ต้องการความสงบ </p>
                    <h3>สิ่งอำนวยความสะดวก</h3>
                    <ul>
                        <li>เตียงนอนพร้อมชุดเครื่องนอน</li>
                        <li>แอร์</li>
                        <li>โต๊ะเครื่องแป้ง</li>
                        <li>ตู้เสื้อผ้า</li>
                        <li>เครื่องทำน้ำอุ่น</li>
                        <li>เครื่องดื่มในห้อง</li>
                        <li>โต๊ะเขียนหนังสือ</li>
                    </ul>
                    <p className={styles.price}>ราคา: <span className={styles.priceNum}>600</span> บาท/คืน</p>
                    <div className={styles.datePickerContainer}>
                        <div className={styles.dateInputWrapper}>
                        <label htmlFor="checkInDate">วันที่เข้าพัก:</label>
                        <input
                            type="date"
                            id="checkInDate"
                            value={checkInDate.toISOString().split('T')[0]}
                            className={styles.dateInput}
                            onChange={(e) => setCheckInDate(new Date(e.target.value))}
                            min={today}
                            required
                        />
                        </div>
                        <div className={styles.dateInputWrapper}>
                        <label htmlFor="checkOutDate">วันที่ออกจากที่พัก:</label>
                        <input
                            type="date"
                            id="checkOutDate"
                            value={checkOutDate.toISOString().split('T')[0]}
                            className={styles.dateInput}
                            onChange={(e) => setCheckOutDate(new Date(e.target.value))}
                            min={today}
                            required
                        />
                        </div>
                        <button className={styles.checkAvailabilityButton} onClick={checkAvailability}>ตรวจสอบห้องว่าง</button>
                    </div>

                    <p>ห้องพักที่ว่าง: {availableRooms} ห้อง</p>
                    <Link href="/bookingroom" passHref>
                        <button className={styles.bookingButton}>จองบ้านพัก</button>
                    </Link>
                    {/* {isLoggedIn ? (
                        <Link href="/bookingroom" passHref>
                        <button className={styles.bookingButton}>จองบ้านพัก</button>
                        </Link>
                    ) : (
                        <Link href="/login" passHref>
                        <button className={styles.bookingButton}>จองบ้านพัก</button>
                        </Link>
                    )} */}
                </div>
                <div className={styles.imageContainer}>
                    <img src="DALL·E 2023-12-25 15.45.00 - A minimalistic and photorealistic image of a guest room designed for 1-2 persons within a resort, following the serene cove color tone theme. The room.png" alt="ห้องพัก" />
                </div>
            </div>
        </div>
        <Footer />
    </div>
  );
};

export default RoomType;
