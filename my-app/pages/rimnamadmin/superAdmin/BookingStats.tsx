// pages/superadmin/BookingStats.tsx
import React, { useEffect, useState } from 'react';
import styles from '../../../styles/superadmin/BookingStats.module.css';

interface BookingData {
    roomType: string;
    totalBookings: number;
    totalroom: number;
    }

const BookingStats = () => {

const [bookingData, setBookingData] = useState<BookingData[]>([]);
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');

//   sample data
const sampleBookingData = [
    {
      roomType: "ห้องเดี่ยว",
      totalroom: 10,
      totalBookings: 8,
    },
    {
      roomType: "ห้องคู่",
      totalroom: 10,
      totalBookings: 10,
    },
    {
      roomType: "ห้องครอบครัว",
      totalroom: 10,
      totalBookings: 6,
    }
  ];
  // เพิ่ม useEffect เพื่อโหลดข้อมูลตัวอย่างเมื่อ component ถูก mount
  useEffect(() => {
    // ตั้งค่าข้อมูลตัวอย่างให้กับ state โดยตรง
    setBookingData(sampleBookingData);
  }, []);

  const fetchFilteredReports = async () => {
    try {
      const response = await fetch(`/api/superadmin/reports?start=${startDate}&end=${endDate}`);
      if (!response.ok) throw new Error('Failed to fetch filtered reports');
      const data = await response.json();
      setBookingData(data);
    } catch (error) {
      console.error('Fetching filtered reports error:', error);
    }
  };

  return (
    <>
        <div className={styles.dateFilterContainer}>
        <label htmlFor="startDate">วันที่เริ่มต้น:</label>
        <input 
            type="date" 
            id="startDate" 
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required 
        />

        <label htmlFor="endDate">วันที่สิ้นสุด:</label>
        <input 
            type="date" 
            id="endDate" 
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required 
        />

        <button onClick={() => fetchFilteredReports()}>Filter</button>
        </div>
        <div className={styles.statsContainer}>
        <h2>สถิติการจอง</h2>
        <table className={styles.bookingTable}>
            <thead>
            <tr>
                <th>ประเภทห้องพัก</th>
                <th>จำนวนห้อง</th>
                <th>จำนวนการจอง</th>
            </tr>
            </thead>
            <tbody>
            {Array.isArray(bookingData) && bookingData.map((data, index) => (
                <tr key={index}>
                    <td>{data.roomType}</td>
                    <td>{data.totalroom}</td>
                    <td>{data.totalBookings}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </>
  );
};

export default BookingStats;
