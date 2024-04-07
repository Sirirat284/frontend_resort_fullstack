import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export const user_auth = () => {
  const router = useRouter();

  useEffect(() => {

    const verifyUser = async () => {
      try {
        console.log("Pass")
        // ส่งคำขอไปยัง API Route เพื่อตรวจสอบ token และ role
        const response = await axios.get('/api/auth/verifyrole', { withCredentials: true });
        // ตรวจสอบคำตอบ หาก role ไม่ใช่ 'User', นำทางไปยังหน้า login
        if (response.data.role !== 'User' || response.status !== 200) {
          router.push('/login');
        }
      } catch (error) {
        // ในกรณีที่ไม่ผ่านการตรวจสอบหรือเกิดข้อผิดพลาด
        // console.error('Authentication error:', error);
        router.push('/login');
      }
    };

    verifyUser();
  }, [router]);
    
  };