import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../../components/admin/Header';
import Menu from '../../../components/menu/superadmin';
import styles from '../../../styles/superadmin/BookingStats.module.css'; // ใช้ CSS ที่เดียวกัน

interface Admin {
  id: number;
  name: string;
  role: string;
  status: 'Active' | 'Inactive';
}

const MonitorAdmins = () => {
  const [admins, setAdmins] = useState<Admin[]>([
    { id: 1, name: 'John Doe',role:"online", status: 'Active' },
    { id: 2, name: 'Jane Smith',role:"online", status: 'Inactive' },
    // เพิ่มเติมตามจำนวนแอดมิน
  ]);
  const router = useRouter(); // Hook useRouter

  // ฟังก์ชันลบแอดมิน
  const handleDeleteAdmin = (adminId: number) => {
    const updatedAdmins = admins.filter(admin => admin.id !== adminId);
    setAdmins(updatedAdmins);
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
              <tr key={admin.id}>
                <td>{index + 1}</td>
                <td>{admin.id}</td>
                <td>{admin.name}</td>
                <td>{admin.role}</td>
                <td>
                    <span className={`${admin.status === 'Active' ? styles.statusDotActive : styles.statusDotInactive}`}></span>
                    {admin.status}
                </td>
                <td>
                  <button className={styles.deleteButton} onClick={() => handleDeleteAdmin(admin.id)}>ลบ</button>
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
