import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/ContactUs.module.css'; // ตรวจสอบ path ให้ถูกต้อง
import Header from '../components/HeaderBar';
import Footer from '../components/Footer';

const ContactUs = () => {
    return (
        <>
        <div className={styles.site_container}>
            <Header/>
            <br></br>
            <div className={styles.container}>
                <h1 className={styles.myTitle}>บ้านริมน้ำรีสอร์ท(Baan rim nam resort)</h1>
                <p>หมู่ 6 ตำบล วังจันทร์ อำเภอ วังจันทร์ จังหวัด ระยอง 21210</p>
                <p>📞02 987 65431</p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <img src="/icon/Facebook_Logo_(2019).png" style={{ width: 'auto', height: '20px' }}/> <span>Baan rim nam</span>
                </p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <img src="/icon/LINE_logo.svg.png" style={{ width: 'auto', height: '20px' }}/> <span>@Baanrimnam</span>
                </p>
                <br></br>
                {/* เพิ่ม layout ใหม่สำหรับ Google Maps และรูปภาพ */}
                <div className={styles.mapLayout}>
                    <div className={styles.mapContainer}>
                    {/* Google Maps iframe */}
                    <iframe
                        className={styles.iframeContainer}
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1736.426875654639!2d101.5870994888122!3d12.892245044072142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sth!2sth!4v1710834331453!5m2!1sth!2sth"
                        style={{ border:0 }}
                        allowFullScreen={false}
                        loading="lazy"
                    ></iframe>
                    </div>
                    <div className={styles.imageMapContainer}>
                    {/* รูปภาพ map ที่คุณทำมา */}
                    <img src="NewIcogram 2024-03-19 11_59.jpeg" alt="Map" className={styles.imageMap}/>
                    </div>
                </div>
            </div>
            <br></br>
            <Footer/>
        </div>
        </>
    );
};

export default ContactUs;
