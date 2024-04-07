// pages/superadmin/AddPromotion.tsx
import React, { useState } from 'react';
import styles from '../../../styles/superadmin/AddPromotion.module.css'; // แก้ไขเส้นทางไฟล์ CSS ให้ถูกต้อง
import { s_ad_auth } from '../../../hooks/adminAuth';


const AddPromotion = () => {
  s_ad_auth();
  const [promotion, setPromotion] = useState({
    title: '',
    details: '',
    startDate: '',
    endDate: '',
    image: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type } = e.target;
    // Assert that e.target is an HTMLInputElement and it has files
    const input = e.target as HTMLInputElement;
    let value = type === 'file' && input.files ? input.files[0] : e.target.value;
    setPromotion(prevState => ({ ...prevState, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(promotion);
    // ตรงนี้ส่งข้อมูลโปรโมชั่นไปยัง backend
  };
  
  return (
    <div className={styles.formContainer}>
    <div className={styles.logoContainer}>
        <img src="../../BAAn RIM NAM(1).png" alt="Logo" className={styles.logo} />
    </div>
    <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="title">หัวข้อโปรโมชั่น:</label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          value={promotion.title} 
          onChange={handleChange} 
          required 
        />

        <label htmlFor="details">รายละเอียดโปรโมชั่น:</label>
        <textarea 
          id="details" 
          name="details" 
          value={promotion.details} 
          onChange={handleChange} 
          required 
        />

        <label htmlFor="startDate">วันที่เริ่มโปรโมชั่น:</label>
        <input 
          type="date" 
          id="startDate" 
          name="startDate" 
          value={promotion.startDate} 
          onChange={handleChange} 
          required 
        />

        <label htmlFor="endDate">วันที่สิ้นสุดโปรโมชั่น:</label>
        <input 
          type="date" 
          id="endDate" 
          name="endDate" 
          value={promotion.endDate} 
          onChange={handleChange} 
          required 
        />

        <label htmlFor="image">รูปภาพโปรโมชั่น:</label>
        <input 
          type="file" 
          id="image" 
          name="image" 
          onChange={handleChange} 
        />
        <button type="submit">เพิ่มโปรโมชั่น</button>
    </form>
</div>

  );
};

export default AddPromotion;
