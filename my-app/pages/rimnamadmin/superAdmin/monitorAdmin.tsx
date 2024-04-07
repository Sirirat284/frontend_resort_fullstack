import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../../components/admin/Header';
import Menu from '../../../components/menu/superadmin';
import { s_ad_auth } from '../../../hooks/adminAuth';
import styles from '../../../styles/superadmin/BookingStats.module.css'; // ใช้ CSS ที่เดียวกัน
import axios from 'axios';

interface Admin {
  AdID: number;
  Full_name: string;
  Role: string;
  status: 'Active' | 'Inactive';
}

const MonitorAdmins = () => {
  s_ad_auth();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const router = useRouter(); // Hook useRouter

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_PATH}/monitoradmin`); // ใส่ URL ของ API endpoint ที่นี่
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data: Admin[] = await response.json();
        setAdmins(data); // อัปเดต state ด้วยข้อมูลที่ได้จาก API
      } catch (error) {
        console.error('Error fetching admins:', error);
        // คุณอาจต้องการจัดการกับ error ที่นี่, เช่น แสดงข้อความ error
      }
    };

    fetchAdmins();
  }, []);

  // ฟังก์ชันลบแอดมิน
// สมมุติว่า adminId มาในรูปแบบ string
const handleDeleteAdmin = async (adminId: string) => {
  try {
    // ทำการลบ admin โดยใช้ adminId ที่เป็น string
    const response = await fetch(`${process.env.BACKEND_PATH}/deleteadmin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({adminId:adminId}),
    });
    if (response.status === 200) {
      // คุณต้องแน่ใจว่าทั้ง adminId และ AdID ใน array มีประเภทข้อมูลเดียวกัน
      const updatedAdmins = admins.filter(admin => admin.AdID.toString() !== adminId);
      setAdmins(updatedAdmins);
      // โค้ดเพิ่มเติมสำหรับการแสดงผลหรือการจัดการสถานะต่อไป
    } else {
      console.error('Failed to delete admin:', response.status);
    }
  } catch (error) {
    console.error('Error deleting admin:', error);
  }
};


  return (
    <>
      <Header/>
      <Menu/>
      <div className={styles.statsContainer}>
      <div className={styles.dateFilterContainer}>
        <button onClick={() => router.push('Addadmin')}>เพิ่มแอดมิน</button>
      </div>
      <br></br>
        <table className={styles.bookingTable}>
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>ไอดีของแอดมิน</th>
              <th>ชื่อของแอดมิน</th>
              <th>ตำแหน่ง</th>
              <th>สถานะการใช้งาน</th>
              <th>การดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={admin.AdID}>
                <td>{index + 1}</td>
                <td>{admin.AdID}</td>
                <td>{admin.Full_name}</td>
                <td>{admin.Role}</td>
                <td>
                    <span className={`${admin.status === 'Active' ? styles.statusDotActive : styles.statusDotInactive}`}></span>
                    {admin.status}
                </td>
                <td>
                  <button className={styles.deleteButton} onClick={() => handleDeleteAdmin(admin.AdID.toString())}>ลบ</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MonitorAdmins;
