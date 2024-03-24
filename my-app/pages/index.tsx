import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from '../components/HeaderBar'; // นำเข้า Header component
import styles from '../styles/Home.module.css';
import Footer from '../components/Footer';
import Link from 'next/link';

const Home = () => {

  return (
    <div>
      <Header/>
      <div className={styles.container}>
        <img src="DALL·E 2023-12-25 13.56.45 - An image capturing the ambiance emanating from a lodging area with a large water reservoir in front and a small picturesque mountain in the view, all .png" alt="Beautiful Resort" style={{ width: '100%', height: '800px' }} />
        <br></br>
        <div className={styles.titlesContainer}>
          <h1 className={styles.title1}>Welcome to </h1>
          <h1 className={styles.title2}>&nbsp;Baan rim nam resort</h1>
        </div>
        <p className={styles.text}>สถานที่ที่พักอันเหมาะเหม็งอวดธรรมชาติ โดดเดี่ยวจากความวุ่นวาย สะดวกสบาย และใกล้ชิดกับท้องฟ้าบนดิน</p>
      </div>
      <br></br><br></br>
      <div className={styles.categories}>
        <img src="BAAn RIM NAM(1).png" alt="Logo" className={styles.logo} />
        <div className={styles.categoryContainer}>
          <div className={styles.category}>
            <img src="icon/Location.png" alt="Location"/>
          </div>
          <div className={styles.category}>
            <img src="icon/Family.png" alt="Family Room"/>
          </div>
          <div className={styles.category}>
            <img src="icon/cowork.png" alt="Coworking Space"/>
          </div>
        </div>
        <br></br><br></br>
      </div>
      <br></br>
      <div className={styles.facilitiesContainer}>
        <h1>สิ่งอำนวยความสะดวกครบครัน</h1>
        <div className={styles.facilities}>
          <div className={styles.facility}>
            <img src="icon/wifi.png" alt="Free WiFi"/>
            <p>Free WiFi (500/500)</p>
          </div>
          <div className={styles.facility}>
            <img src="icon/changing-room.png" alt="Hangers"/>
            <p>ห้องแต่งตัวกางเขน</p>
          </div>
          <div className={styles.facility}>
            <img src="icon/screen.png" alt="LCD TV"/>
            <p>LCD TV</p>
          </div>
          <div className={styles.facility}>
            <img src="icon/washer-2.png" alt="Laundry"/>
            <p>เครื่องซัก/อบผ้า</p>
          </div>
          <div className={styles.facility}>
            <img src="icon/parking.png" alt="Parking"/>
            <p>ที่จอดรถหน้าบ้าน</p>
          </div>
          <div className={styles.facility}>
            <img src="icon/croissant.png" alt="Dryer"/>
            <p>พร้อมเครื่องซัก</p>
          </div>
          <div className={styles.facility}>
            <img src="icon/camera-cctv.png" alt="CCTV"/>
            <p>CCTV</p>
          </div>
          <div className={styles.facility}>
            <img src="icon/charging-station.png" alt="EV Charging"/>
            <p>EV Charging</p>
          </div>
        </div>
      </div>
      <br></br>
      <div className={styles.contactContainer}>
        <div className={styles.contactInfo}>
          <h2 className={styles.titlecontage}>หากท่านสนใจ</h2>
          <p>สามารถติดต่อสอบถามได้ที่</p>
          <p className={styles.phoneNumber}>02 345 6789</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <img src="/icon/Facebook_Logo_(2019).png" style={{ width: 'auto', height: '20px' }}/> <span>Baan rim nam</span>
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <img src="/icon/LINE_logo.svg.png" style={{ width: 'auto', height: '20px' }}/> <span>@Baanrimnam</span>
          </p>
          <div className={styles.actionButton}>
          <Link href="/bookingroom" passHref>
            <button>จองบ้านพัก</button>
          </Link>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src="DALL·E 2023-12-25 14.17.38 - An image of a bedroom capturing the same tranquil ambiance as the previous scene, with a 4_3 aspect ratio. The room should reflect a serene and harmon.png" alt="Room with View"/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
