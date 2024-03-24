import React, { useState } from 'react';
import styles from '../../../styles/superadmin/AddAdmin.module.css';

const AddAdmin = () => {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAdmin(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Check if passwords match
        if (admin.password !== admin.confirmPassword) {
            alert('Passwords do not match!');
            return; // Stop the form from submitting
        }

        console.log(admin);
        // Logic to send data to backend
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
                <option value="Online">Online Admin</option>
                <option value="Onsite">Onsite Admin</option>
            </select>
    
            <button type="submit">เพิ่ม Admin</button>
        </form>
    </div>
    
    );
};

export default AddAdmin;
