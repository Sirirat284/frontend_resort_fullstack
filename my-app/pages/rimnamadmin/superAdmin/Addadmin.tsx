import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../../styles/superadmin/AddAdmin.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { s_ad_auth } from '../../../hooks/adminAuth';


const AddAdmin = () => {
    
    s_ad_auth();
    const [admin, setAdmin] = useState({
        adminName: '',
        password: '',
        confirmPassword: '',
        idCard: '',
        fullName: '',
        phone: '',
        email: '',
        position: ''
    });
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAdmin(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSecurityAlert = () => {
        console.warn('Potential XSS attack detected.');
        alert('เราได้ตรวจพบพฤติกรรมที่ไม่ปลอดภัยในการป้อนข้อมูลของคุณ คุณจะถูกล็อกเอาต์เพื่อความปลอดภัยของคุณเอง.');
      
        // ลบข้อมูลผู้ใช้จาก sessionStorage หรือ localStorage
        sessionStorage.removeItem('userID');
        sessionStorage.removeItem('role');
        localStorage.removeItem('bookingDetails');
      
        // Redirect ผู้ใช้ไปยังหน้าล็อกอินหรือหน้าแรก
        window.location.href = '/'; // หรือหน้าใดก็ตามที่คุณต้องการ
      };
      
      
      const sanitizeInput = (input: string): string => {
        if (/javascript:|<script>|<\/script>|onerror=|onload=|eval\(|href=['"]javascript:/i.test(input)) {
          handleSecurityAlert();
          throw new Error('Invalid input: dangerous content detected.');
      }
      
      
        const tagsToReplace: Record<string, string> = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;'
        };
      
        const sanitized = input.replace(/[&<>"']/g, tag => tagsToReplace[tag] || tag);
        
        return sanitized;
      };

      const validateEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
      };
  
    async function hashData(data: string) {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data);
      const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(admin.email)) {
            setError('Invalid email format');
            return;
        }
        // Check if passwords match
        if (admin.password !== admin.confirmPassword) {
            alert('Passwords do not match!');
            return; // Stop the form from submitting
        }

        const passwordPolicy = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordPolicy.test(admin.password)) {
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
        const hashedPassword = await hashData(admin.password);

        const regisAdmin = {
            AdminName: sanitizeInput(admin.adminName),
            Password: sanitizeInput(hashedPassword),
            ID_Card: sanitizeInput(admin.idCard),
            Full_Name: sanitizeInput(admin.fullName),
            Tel: sanitizeInput(admin.phone),
            Email: sanitizeInput(admin.email),
            Role: sanitizeInput(admin.position)
        };

        try {
            const response = await fetch(`${process.env.BACKEND_PATH}/registerAdmin`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(regisAdmin),
              });

              if (response.ok) { // ตรวจสอบว่า response อยู่ในตระกูล 200
                const data = await response.json();
                if (data) {
                  console.log(data);
                  router.push('/rimnamadmin/superAdmin/monitorAdmin');
                } else {
                    console.warn('No data returned from the server.');
                    Swal.fire({
                      icon: 'warning',
                      title: 'ไม่พบข้อมูล',
                      text: 'ไม่มีข้อมูลที่ส่งกลับมาจากเซิร์ฟเวอร์',
                    });
                }
              } else {
                if(response.status === 409){
                    console.warn(`Warning: The request failed with status code ${response.status}`);
                    Swal.fire({
                      icon: 'error',
                      title: `เกิดข้อผิดพลาด! ${response.status} `,
                      text: `ข้อมูลนี้มีอยู่แล้ว!!`,
                    });
                }
                else {
                    console.warn(`Warning: The request failed with status code ${response.status}`);
                    Swal.fire({
                      icon: 'error',
                      title: `เกิดข้อผิดพลาด! ${response.status} `,
                    });
                }
              }
        }
        catch (error) {
            // console.error('Error:', error);
            // router.push('/'); // Redirect ในกรณีมีข้อผิดพลาด
        }

    };

    return (
        <div className={styles.formContainer}>
        <div className={styles.logoContainer}>
            <img src="../../BAAn RIM NAM(1).png" alt="Logo" className={styles.logo} />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="adminName">Admin Name:</label>
            <input type="text" id="adminName" name="adminName" value={admin.adminName} onChange={handleChange} required />
    
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={admin.password} onChange={handleChange} required />

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={admin.confirmPassword} onChange={handleChange} required />
    
            <label htmlFor="idCard">เลขบัตรประชาชน:</label>
            <input type="text" id="idCard" name="idCard" value={admin.idCard} onChange={handleChange} required />
    
            <label htmlFor="fullName">ชื่อ-นามสกุล:</label>
            <input type="text" id="fullName" name="fullName" value={admin.fullName} onChange={handleChange} required />
    
            <label htmlFor="phone">เบอร์โทร:</label>
            <input type="tel" id="phone" name="phone" value={admin.phone} onChange={handleChange} required />
    
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={admin.email} onChange={handleChange} required />
    
            <label htmlFor="position">ตำแหน่ง:</label>
            <select id="position" name="position" value={admin.position} onChange={handleChange} required>
                <option value="">เลือกตำแหน่ง</option>
                <option value="OnlineAdmin">Online Admin</option>
                <option value="OnsiteAdmin">Onsite Admin</option>
            </select>
    
            <button type="submit">เพิ่ม Admin</button>
        </form>
    </div>
    
    );
};

export default AddAdmin;
