import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const router = useRouter();
  // สมมติว่าเรามี state สำหรับตรวจสอบว่าผู้ใช้เข้าสู่ระบบหรือไม่
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // สมมติว่าเราตรวจสอบสถานะการเข้าสู่ระบบของผู้ใช้จาก localStorage หรือ API
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(userLoggedIn === "true");
  }, []);

  const navigateToLogin = () => {
    if (!isLoggedIn) {
      router.push('/login'); // ถ้าผู้ใช้ไม่ได้เข้าสู่ระบบ, นำไปยังหน้า login
    } else {
      // หรือทำการอื่นๆ หากผู้ใช้เข้าสู่ระบบแล้ว
      alert("คุณเข้าสู่ระบบแล้ว");
    }
  };

  return (
    <div>
      <h1>หน้าหลัก</h1>
      <button onClick={navigateToLogin}>ไปยังหน้าเข้าสู่ระบบ</button>
    </div>
  );
};

export default Home;
