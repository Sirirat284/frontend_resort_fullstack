// pages/profile.tsx
import React from 'react';
// import { UserProfile } from '../types/userProfile';
import styles from '../styles/Profile.module.css'; // Assume this CSS module is created
import Header from '../components/HeaderBar'; // นำเข้า Header component
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { user_auth } from '../hooks/userAuth';


interface UserProfile {
    fullName: string;
    phoneNumber: string;
    age: string;
    address: string;
    subDistrict: string;
    district: string;
    province: string;
    occupation: string;
    email: string;
  }

const userProfileData: UserProfile = {
  fullName: 'สมชาย ดีมาก',
  phoneNumber: '098 765 4321',
  age: '30',
  address: '123 ถนนสวยงาม',
  subDistrict: 'สวนใหญ่',
  district: 'เมือง',
  province: 'นครราชสีมา',
  occupation: 'นักพัฒนาซอฟต์แวร์',
  email: 'somchai@example.com',
};

const Profile = () => {
  user_auth();
  return (
    <>
    <Header/>
    <div className={styles.pageContainer}>
        <div className={styles.sidebarContainer}>
        <Sidebar />
        </div>
        <div className={styles.contentContainer}>
        <div className={styles.profileContainer}>
            <div className={styles.profileCard}>
                <div className={styles.profileHeader}>
                    {/* Add logo here */}
                    <h2>โปรไฟล์</h2>
                </div>
                <div className={styles.profileDetails}>
                    <p>ชื่อ-นามสกุล: {userProfileData.fullName}</p>
                    <p>เบอร์โทรศัพท์: {userProfileData.phoneNumber}</p>
                    <p>อายุ: {userProfileData.age}</p>
                    <p>ที่อยู่: {userProfileData.address}, {userProfileData.subDistrict}, {userProfileData.district}, {userProfileData.province}</p>
                    <p>อาชีพ: {userProfileData.occupation}</p>
                    <p>Email: {userProfileData.email}</p>
                </div>
            </div>
        </div>
        </div>
    </div>
    <Footer/>
    </>
  );
};

export default Profile;


