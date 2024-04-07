import React, { useState,useEffect } from 'react';
import Header from '../../../components/admin/Header';
import Menu from '../../../components/menu/onlineAdminMenu';
import styles from '../../../styles/superadmin/BookingStats.module.css';
import { OL_ad_auth } from '../../../hooks/adminAuth';

interface Room {
  roomID: number;
  roomNum: string;
  roomTypeName: string;
  status: 'ว่าง' | 'ไม่ว่าง' | 'ปรับปรุง';
}

const MonitorRooms = () => {
  OL_ad_auth();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_PATH}/monitorRoom`); // ตัวอย่าง URL ของ API ที่ใช้ดึงข้อมูลห้อง
        if (!response.ok) throw new Error('Failed to fetch rooms');
        const data = await response.json();
        setRooms(data); // อัปเดต state ด้วยข้อมูลที่ได้จาก API
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);
  

  return (
    <>
      <Header />
      <Menu />
      <div className={styles.statsContainer}>
        <table className={styles.bookingTable}>
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>หมายเลขห้อง</th>
              <th>ประเภทห้อง</th>
              <th>สถานะห้อง</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr key={room.roomID}>
              <td>{index + 1}</td>
              <td>{room.roomNum}</td>
              <td>{room.roomTypeName}</td>
              <td>
                <span className={`${
                  room.status === 'ว่าง' ? styles.statusDotAvailable : 
                  room.status === 'ไม่ว่าง' ? styles.statusDotOccupied : 
                  styles.statusDotUnderMaintenance}`}></span>
                {room.status}
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MonitorRooms;
