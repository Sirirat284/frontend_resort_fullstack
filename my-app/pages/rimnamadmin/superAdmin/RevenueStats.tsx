import React, { useEffect, useState } from 'react';
import styles from '../../../styles/superadmin/BookingStats.module.css';
import { s_ad_auth } from '../../../hooks/adminAuth';

interface DailyRevenue {
  date: string;
  roomType:string;
  totalGuests: number;
  revenue: number;
}

const RevenueStats = () => {
    s_ad_auth();
    const [dailyRevenues, setDailyRevenues] = useState<DailyRevenue[]>([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // สมมติว่ามีการเรียกข้อมูลจาก API
    const fetchFilteredReports = async () => {
      // ตัวอย่างการใช้ startDate และ endDate ในการ fetch ข้อมูล
      console.log(startDate, endDate);
      // สมมติว่าได้ข้อมูลมาเป็นรายได้แต่ละวัน
    };
    
    const sampleBookingData = [
        { roomType: "ห้องเดี่ยว",date: "2024-03-01", totalGuests: 20, revenue: 4000 },
        { roomType: "ห้องเดี่ยว",date: "2024-03-02", totalGuests: 15, revenue: 3000 },
        { roomType: "ห้องเดี่ยว",date: "2024-03-02", totalGuests: 15, revenue: 3000 },
        // อื่นๆ
      ];

    useEffect(() => {
        // ตั้งค่าข้อมูลตัวอย่างให้กับ state
        setDailyRevenues(sampleBookingData);
      }, []); // พารามิเตอร์อาร์เรย์ว่างหมายความว่า useEffect นี้จะทำงานเพียงครั้งเดียวหลังจากคอมโพเนนต์ render ครั้งแรก
      

      

    // คำนวณรายได้รวม
    const totalRevenue = dailyRevenues.reduce((acc, curr) => acc + curr.revenue, 0);

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

                <button onClick={fetchFilteredReports}>Filter</button>
            </div>
            <div className={styles.statsContainer}>
                <h2>รายได้รวม</h2>
                <table className={styles.bookingTable}>  
                    <thead>
                        <tr>
                            <th>วันที่</th>
                            <th>ประเภทบ้าน</th>
                            <th>จำนวนเข้าพัก</th>
                            <th>รายได้</th>
                        </tr>
                    </thead>
                    <tbody className={`${styles.bookingTable} ${styles.dailyRevenueTable}`}>
                        {dailyRevenues.map((data, index) => (
                            <tr key={index}>
                                <td>{data.date}</td>
                                <td>{data.roomType}</td>
                                <td>{data.totalGuests}</td>
                                <td>{data.revenue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className={styles.bookingTable}> 
                    <tbody>
                        <tr className={styles.highlightRow}>
                            <td colSpan={3}>รายได้รวม</td>
                            <td>{totalRevenue}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default RevenueStats;
