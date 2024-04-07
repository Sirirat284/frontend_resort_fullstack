import React, { useState, useEffect } from 'react';
import Header from '../../../components/admin/Header';
import Menu from '../../../components/menu/superadmin';
import { s_ad_auth } from '../../../hooks/adminAuth';
import styles from '../../../styles/superadmin/BookingStats.module.css';

interface Room {
  roomID: number;
  roomNum: string;
  roomTypeName: string;
  status: 'ว่าง' | 'ไม่ว่าง' | 'ปรับปรุง';
}

const MonitorRooms = () => {
  s_ad_auth();
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
  
  const handleToggleStatus = async (roomId: number) => {
    // หาห้องที่ต้องการแก้ไข
    const roomToToggle = rooms.find(room => room.roomID === roomId);
  
    if (!roomToToggle) return; // ถ้าไม่พบห้อง, ยกเลิกการดำเนินการ
  
    // กำหนดสถานะใหม่ตามสถานะปัจจุบัน
    const newStatus = roomToToggle.status === 'ปรับปรุง' ? 'ว่าง' : 'ปรับปรุง';
  
    try {
      // สร้าง URL ที่มี query parameters
      const url = new URL(`${process.env.BACKEND_PATH}/updateStatusRoom`, window.location.origin);
      url.searchParams.append('roomID', roomId.toString());
      url.searchParams.append('status', newStatus);
    
      // ส่งข้อมูลไปยัง API บนเซิร์ฟเวอร์ โดยใช้ query parameters
      const response = await fetch(url, {
        method: 'GET', // ใช้ method GET
        headers: {
          'Content-Type': 'application/json',
        },
        // ไม่ต้องใช้ body เนื่องจากข้อมูลถูกส่งผ่าน query parameters
      });
    
      if (!response.ok) throw new Error('Failed to toggle room status');
    
      // อัพเดท state หลังจากสำเร็จ
      setRooms(prevRooms => prevRooms.map(room => room.roomID === roomId ? { ...room, status: newStatus } : room));
    
      console.log('Room status toggled successfully');
    } catch (error) {
      console.error('Error toggling room status:', error);
    }
  }

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
              <th>การดำเนินการ</th>
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
                <td>
                <button
                    className={`${styles.updateButton} ${room.status === 'ปรับปรุง' ? styles.activeStatus : ''}`}
                    onClick={() => handleToggleStatus(room.roomID)}
                >
                    {room.status === 'ปรับปรุง' ? 'ปรับปรุง' : 'ปรับปรุง'}
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MonitorRooms ;
