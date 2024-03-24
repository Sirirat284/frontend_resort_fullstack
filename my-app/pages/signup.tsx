// pages/signup.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Signup.module.css'; // ตรวจสอบให้แน่ใจว่าคุณได้สร้าง CSS module นี้

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
    const handleSecurityAlert = () => {
        alert("คำเตือน: การพยายาม hack หรือเข้าถึงระบบโดยไม่ได้รับอนุญาตนั้นผิดกฎหมายและจะถูกดำเนินการตามกฎหมายที่เกี่ยวข้อง. กรุณาใช้เว็บไซต์นี้อย่างมีจริยธรรม.");
      }
    const sanitizeInput = (input: string): string => {
        // ตรวจสอบว่า input มีเนื้อหาที่อาจเป็น script หรือไม่
        if (/<script>/i.test(input)) {
            // แจ้งเตือนผู้ใช้
            handleSecurityAlert();
            throw new Error('Invalid input: script tags are not allowed.');
        }
        // ทำการ escape ค่าพิเศษที่อาจทำให้เกิดการโจมตี XSS
        return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    try {
        const sanitizedDetails = {
            fullName: sanitizeInput(formData.fullName),
            phoneNumber: sanitizeInput(formData.phoneNumber),
            age: sanitizeInput(formData.age),
            address: sanitizeInput(formData.address),
            subdistrict: sanitizeInput(formData.subdistrict),
            district: sanitizeInput(formData.district),
            province: sanitizeInput(formData.province),
            occupation: sanitizeInput(formData.occupation),
            email: sanitizeInput(formData.email),
            password: sanitizeInput(formData.password),
            confirmPassword:sanitizeInput(formData.confirmPassword)
          };
        // เพิ่มโค้ดสำหรับการส่งข้อมูลการลงทะเบียนไปยังเซิร์ฟเวอร์ที่นี่
        console.log('Form submitted', formData);
        // Redirect หลังจากการลงทะเบียนสำเร็จ
        router.push('/welcome'); // หรือเส้นทางอื่นที่ต้องการ
    }
    catch (error) {
        console.error('Error:', error);
        router.push('/'); // Redirect ในกรณีมีข้อผิดพลาด
    }
  };

  const handleShowPolicy = () => {
    // เพิ่มโค้ดสำหรับการแสดง policy ที่นี่
    alert('Policy...');
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
        
        {/* แทรก input fields อื่นๆ ที่นี่ */}
        <div className={styles.formGroup}>
          <input type="checkbox" id="acceptTerms" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} />
          <label htmlFor="acceptTerms">
            ฉันยอมรับ <span className={styles.termsLink} onClick={handleShowPolicy}>เงื่อนไขการใช้</span>
          </label>
        </div>
        <div className={styles.formAction}>
          <button type="submit">สมัครสมาชิก</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
