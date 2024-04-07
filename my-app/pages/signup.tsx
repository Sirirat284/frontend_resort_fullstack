// pages/signup.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Signup.module.css'; // ตรวจสอบให้แน่ใจว่าคุณได้สร้าง CSS module นี้
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { sanitizeInput } from '../units/security';
// import zxcvbn from 'zxcvbn';
// import bcrypt from "bcrypt";


const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    age: '',
    address: '',
    subdistrict: '',
    district: '',
    province: '',
    occupation: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });


  const router = useRouter();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isChecked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData({
      ...formData,
      [name]: isChecked,
    });
    };

    async function hashData(data: string) {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data);
      const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

        // เพิ่มการตรวจสอบว่ารหัสผ่านตรงกันและ policy ถูกยอมรับหรือไม่
        if (formData.password !== formData.confirmPassword) {
        alert('รหัสผ่านไม่ตรงกัน');
        return;
        }
        if (!formData.acceptTerms) {
        alert('กรุณายอมรับเงื่อนไข');
        return;
        }
        const passwordPolicy = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordPolicy.test(formData.password)) {
          Swal.fire({
            icon: 'error',
            title: 'รหัสผ่านไม่ปลอดภัย',
            text: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร และรวมถึงตัวเลข, ตัวพิมพ์เล็ก, ตัวพิมพ์ใหญ่',
            confirmButtonText: 'ตกลง',
            customClass: {
              confirmButton: 'btn btn-success', // ตัวอย่างการกำหนด class สำหรับปุ่ม หากมี
            },
            buttonsStyling: false, // ตั้งค่านี้เป็น false หากคุณต้องการใช้ CSS ของคุณเองสำหรับปุ่ม
          });
          return;
        }

        // const passwordAnalysis = zxcvbn(formData.password);

        // if (passwordAnalysis.score < 3) {
        //   Swal.fire({
        //     icon: 'warning',
        //     title: 'รหัสผ่านไม่ปลอดภัยพอ',
        //     text: `คำแนะนำเพื่อเพิ่มความปลอดภัยของรหัสผ่าน: ${passwordAnalysis.feedback.suggestions.join(' ')}`,
        //     confirmButtonText: 'ตกลง',
        //   });
        //   return;
        // }
    try {
          const hashedPassword = await hashData(formData.password);
          const response = await axios.post(`${process.env.BACKEND_PATH}/register`, {
              fullName: sanitizeInput(formData.fullName),
              phoneNumber: sanitizeInput(formData.phoneNumber),
              age: sanitizeInput(formData.age),
              address: sanitizeInput(formData.address),
              subdistrict: sanitizeInput(formData.subdistrict),
              district: sanitizeInput(formData.district),
              province: sanitizeInput(formData.province),
              occupation: sanitizeInput(formData.occupation),
              email:formData.email,
              password:hashedPassword
              // password:hashedPassword
          });

         // ตรวจสอบสถานะ response
    if (response.status === 201) {
      // แสดงแจ้งเตือนสำหรับการลงทะเบียนสำเร็จ
      Swal.fire({
        icon: 'success',
        title: 'ลงทะเบียนสำเร็จ',
        showConfirmButton: false,
        timer: 1000
      }).then(() => {
        // เปลี่ยนหน้าไปยังหน้า login หลังจากแสดงแจ้งเตือน
        router.push('/login');
      });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 409) {
        // Email ถูกใช้งานแล้ว
        Swal.fire('แจ้งเตือน', 'Email นี้ถูกใช้งานแล้ว', 'warning');
      } else if (error.response?.status === 500) {
        // ข้อผิดพลาดจากเซิร์ฟเวอร์
        Swal.fire('ข้อผิดพลาด', 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์', 'error');
      }
    } else {
      // ข้อผิดพลาดอื่นๆ
      Swal.fire('ข้อผิดพลาด', 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ', 'error');
    }
  }
};

  const handleShowPolicy = () => {
    Swal.fire({
      title: 'นโยบายความเป็นส่วนตัว',
      html: `
      <h2>นโยบายความเป็นส่วนตัว</h2>
      <p>เว็บไซต์นี้มุ่งมั่นที่จะปกป้องความเป็นส่วนตัวของคุณ นโยบายความเป็นส่วนตัวนี้อธิบายวิธีการรวบรวมและใช้ข้อมูลส่วนบุคคลที่คุณให้กับเรา</p>
      
      <h3>ข้อมูลที่เรารวบรวม</h3>
      <ul>
        <li><strong>ข้อมูลส่วนบุคคล:</strong> เช่น ชื่อ, ที่อยู่อีเมล, ที่อยู่จัดส่ง, และหมายเลขโทรศัพท์</li>
        <li><strong>ข้อมูลการเรียกดูเว็บไซต์:</strong> เช่น หน้าที่คุณเข้าชม, เวลาที่คุณใช้บนแต่ละหน้า, และลิงก์ที่คุณคลิก</li>
      </ul>
      
      <h3>วิธีการใช้ข้อมูลของคุณ</h3>
      <p>เราอาจใช้ข้อมูลของคุณในการ:</p>
      <ul>
        <li>ปรับปรุงคุณภาพการบริการ</li>
        <li>สื่อสารกับคุณเกี่ยวกับบริการหรือข้อเสนอพิเศษ</li>
        <li>วิเคราะห์การใช้งานเว็บไซต์เพื่อพัฒนาประสบการณ์ของผู้ใช้</li>
      </ul>
      
      <h3>การแชร์ข้อมูลของคุณ</h3>
      <p>เราจะไม่ขายหรือแชร์ข้อมูลส่วนบุคคลของคุณกับบุคคลที่สามโดยไม่ได้รับอนุญาตจากคุณ ยกเว้นในกรณีที่จำเป็นต้องเปิดเผยตามกฎหมาย</p>
      
      <h3>การป้องกันข้อมูลของคุณ</h3>
      <p>เราใช้มาตรการด้านความปลอดภัยทางเทคนิคและการจัดการเพื่อป้องกันการสูญหาย, การใช้งานผิดวัตถุประสงค์, การเข้าถึงโดยไม่ได้รับอนุญาต, การเปิดเผย, การเปลี่ยนแปลง หรือการทำลายข้อมูลของคุณ</p>
      
      <h3>การเข้าถึงและควบคุมข้อมูลของคุณ</h3>
      <p>คุณมีสิทธิ์ในการเข้าถึง, แก้ไข, หรือขอลบข้อมูลส่วนบุคคลของคุณที่เราเก็บรักษาได้ทุกเมื่อ โดยสามารถติดต่อเราได้ที่อีเมลหรือหมายเลขโทรศัพท์ที่ระบุในเว็บไซต์</p>
      
      <p>หากคุณมีคำถามเพิ่มเติมเกี่ยวกับนโยบายความเป็นส่วนตัวของเรา หรือวิธีการที่เราจัดการกับข้อมูลส่วนบุคคลของคุณ กรุณาติดต่อเรา</p>
      
      `,
      confirmButtonText: 'ยอมรับ',
      width: 600,
      padding: '3em',
      background: '#fff',
      backdrop: `
        rgba(0,0,0,0.4)
      `
    }).then((result) => {
      if (result.isConfirmed) {
        // หากผู้ใช้ยอมรับนโยบาย
        console.log('ผู้ใช้ยอมรับนโยบาย');
      }
    });
  };
  



  return (
<div className={styles.signupForm}>
      <div className={styles.logo}>
        <img src="BAAn RIM NAM(1).png" alt="Logo" />
      </div>
      <h1 className={styles.formTitle}>สมัครสมาชิก</h1>
      <form onSubmit={handleSubmit}>
        {/* เพิ่มฟอร์มต่างๆ ที่นี่ */}
        <div className={styles.formGroup}>
          <label htmlFor="fullName">ชื่อ-นามสกุล:</label>
          <input type="text" 
                id="fullName" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="PhoneNumber">เบอร์โทรติดต่อ:</label>
          <input type="tel" 
                id="phoneNumber" 
                name="phoneNumber" 
                value={formData.phoneNumber} 
                onChange={handleChange} 
                required  
                pattern="[0-9]{10}" 
                title="เบอร์โทรศัพท์ควรมี 10 หลักและประกอบด้วยตัวเลขเท่านั้น"/>
        </div>
        <div className={styles.formGroup}>
            <label htmlFor="age">อายุ:</label>
            <select id="age" 
                    name="age" 
                    value={formData.age} 
                    onChange={handleChange} 
                    required>
                <option value="">เลือกอายุ</option>
                <option value="18-25">18-25 ปี</option>
                <option value="26-35">26-35 ปี</option>
                <option value="36-45">36-45 ปี</option>
                <option value="46-55">46-55 ปี</option>
                <option value="56+">มากกว่า 55 ปี</option>
            </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="Address">ที่อยู่:</label>
          <input type="text" 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="SubDistrict">ตำบล/แขวง:</label>
          <input type="text" 
                id="subdistrict" 
                name="subdistrict" 
                value={formData.subdistrict} 
                onChange={handleChange} 
                required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="District">อำเภอ/เขต:</label>
          <input type="text" 
                id="district" 
                name="district" 
                value={formData.district} 
                onChange={handleChange} 
                required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="Province">จังหวัด:</label>
          <input type="text"
                id="province" 
                name="province" 
                value={formData.province} 
                onChange={handleChange} 
                required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="Occupation">อาชีพ:</label>
          <input type="text" 
                id="occupation" 
                name="occupation" 
                value={formData.occupation} 
                onChange={handleChange} 
                required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="Email">Email:</label>
          <input type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="Password">รหัสผ่าน:</label>
          <input type="password" 
                id="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน:</label>
          <input type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required />
        </div>
        <div className={styles.formGroup}>
          <input type="checkbox" id="acceptTerms" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} />
          <label htmlFor="acceptTerms">
            ฉันยอมรับ <span className={styles.termsLink} onClick={handleShowPolicy}>เงื่อนไขการใช้</span>
          </label>
        </div>
        <div className={styles.formAction}  >
          <button type="submit">สมัครสมาชิก</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
