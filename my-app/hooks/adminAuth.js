import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export const s_ad_auth = () => {
  const router = useRouter();
  useEffect(() => {

    const verifyUser = async () => {
      try {
        // ส่งคำขอไปยัง API Route เพื่อตรวจสอบ token และ role
        const response = await axios.get('/api/auth/verifyrole', { withCredentials: true });
        // ตรวจสอบคำตอบ หาก role ไม่ใช่ 'User', นำทางไปยังหน้า login
        if (response.data.role !== 'SuperAdmin') {
          router.push('/rimnamadmin');
        }
      } catch (error) {
        // ในกรณีที่ไม่ผ่านการตรวจสอบหรือเกิดข้อผิดพลาด
        router.push('/rimnamadmin');
      }
    };

    verifyUser();
  }, [router]);
  
};

export const OL_ad_auth = () => {
  const router = useRouter();
  useEffect(() => {
    console.log("passs")
    const verifyUser = async () => {
      try {
        // ส่งคำขอไปยัง API Route เพื่อตรวจสอบ token และ role
        const response = await axios.get('/api/auth/verifyrole', { withCredentials: true });

        // ตรวจสอบคำตอบ หาก role ไม่ใช่ 'User', นำทางไปยังหน้า login
        if (response.data.role !== 'OnlineAdmin') {
          router.push('/rimnamadmin');
        }
      } catch (error) {
        // ในกรณีที่ไม่ผ่านการตรวจสอบหรือเกิดข้อผิดพลาด
        router.push('/rimnamadmin');
      }
    };

    verifyUser();
  }, [router]);
};

export const OS_ad_auth = () => {
  const router = useRouter();
  useEffect(() => {

    const verifyUser = async () => {
      try {
        // ส่งคำขอไปยัง API Route เพื่อตรวจสอบ token และ role
        const response = await axios.get('/api/auth/verifyrole', { withCredentials: true });
        // ตรวจสอบคำตอบ หาก role ไม่ใช่ 'User', นำทางไปยังหน้า login
        if (response.data.role !== 'OnsiteAdmin') {
          router.push('/rimnamadmin');
        }
      } catch (error) {
        // ในกรณีที่ไม่ผ่านการตรวจสอบหรือเกิดข้อผิดพลาด
        router.push('/rimnamadmin');
      }
    };

    verifyUser();
  }, [router]);
};
