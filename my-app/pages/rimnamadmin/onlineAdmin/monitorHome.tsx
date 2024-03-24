import React, { useState } from 'react';
import Header from '../../../components/admin/Header';
import Menu from '../../../components/menu/onlineAdminMenu';
import styles from '../../../styles/superadmin/BookingStats.module.css';

interface Room {
  id: number;
  roomNumber: string;
  roomType: string;
  status: 'ว่าง' | 'ไม่ว่าง' | 'ปรับปรุง';
}

const MonitorRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([
    { id: 1, roomNumber: '101', roomType: 'Single', status: 'ว่าง' },
    { id: 2, roomNumber: '102', roomType: 'Double', status: 'ไม่ว่าง' },
    { id: 3, roomNumber: '103', roomType: 'Suite', status: 'ปรับปรุง' },
  ]);

  const handleUpdateStatus = async (roomId: number) => {
    // กำหนดชนิดข้อมูลให้กับ updatedRooms แบบชัดเจนเพื่อป้องกันข้อผิดพลาด
    const updatedRooms: Room[] = rooms.map(room =>
      room.id === roomId ? { ...room, status: 'ปรับปรุง' } : room
    );
    setRooms(updatedRooms);
  
    // จำลองการส่งข้อมูลไปยังแบ็กเอนด์
    try {
      const response = await fetch(`/api/rooms/update/${roomId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'ปรับปรุง' }),
      });
  
      if (!response.ok) throw new Error('Failed to update room status');
      console.log('Room status updated successfully');
    } catch (error) {
      console.error('Error updating room status:', error);
    }
  };
  const handleToggleStatus = (roomId: number) => {
    setRooms(prevRooms => prevRooms.map(room => {
      if (room.id === roomId) {
        // สลับสถานะระหว่าง "ปรับปรุง" และ "ว่าง"
        return {
          ...room,
          status: room.status === 'ปรับปรุง' ? 'ว่าง' : 'ปรับปรุง'
        };
      }
      return room;
    }));
  };
  

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
              <tr key={room.id}>
                <td>{index + 1}</td>
                <td>{room.roomNumber}</td>
                <td>{room.roomType}</td>
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
