// pages/profile.tsx
import React from 'react';
// import { UserProfile } from '../types/userProfile';
import styles from '../styles/Profile.module.css'; // Assume this CSS module is created
import Header from '../components/HeaderBar'; // นำเข้า Header component
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';


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
    // <>
    //     <Header/>
    //     <div className={styles.profileContainer}>
    //         <div className={styles.profileCard}>
    //             <div className={styles.profileHeader}>
    //             {/* Add logo here */}
    //             <h2>โปรไฟล์</h2>
    //             </div>
    //             <div className={styles.profileDetails}>
    //             <p>ชื่อ-นามสกุล: {userProfileData.fullName}</p>
    //             <p>เบอร์โทรศัพท์: {userProfileData.phoneNumber}</p>
    //             <p>อายุ: {userProfileData.age}</p>
    //             <p>ที่อยู่: {userProfileData.address}, {userProfileData.subDistrict}, {userProfileData.district}, {userProfileData.province}</p>
    //             <p>อาชีพ: {userProfileData.occupation}</p>
    //             <p>Email: {userProfileData.email}</p>
    //             </div>
    //         </div>
    //     </div>
    //     <Footer/>
    // </>
  );
};

export default Profile;

// // pages/profile.tsx
// import React from 'react';
// import { GetServerSideProps } from 'next';
// import Header from '../components/HeaderBar'; // Import your Header component
// import Footer from '../components/Footer'; // Import your Footer component
// import styles from '../styles/Profile.module.css'; // Assume this CSS module is created

// interface UserProfile {
//   fullName: string;
//   phoneNumber: string;
//   age: string;
//   address: string;
//   subDistrict: string;
//   district: string;
//   province: string;
//   occupation: string;
//   email: string;
// }

// interface ProfileProps {
//   userProfile: UserProfile;
// }

// const Profile: React.FC<ProfileProps> = ({ userProfile }) => {
//   return (
//     <>
//       <Header />
//       <div className={styles.profileContainer}>
//         <div className={styles.profileCard}>
//           <div className={styles.profileHeader}>
//             {/* Logo here if needed */}
//             <h2>โปรไฟล์</h2>
//           </div>
//           <div className={styles.profileDetails}>
//             <p>ชื่อ-นามสกุล: {userProfile.fullName}</p>
//             <p>เบอร์โทรศัพท์: {userProfile.phoneNumber}</p>
//             <p>อายุ: {userProfile.age}</p>
//             <p>ที่อยู่: {`${userProfile.address}, ${userProfile.subDistrict}, ${userProfile.district}, ${userProfile.province}`}</p>
//             <p>อาชีพ: {userProfile.occupation}</p>
//             <p>Email: {userProfile.email}</p>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // Fetch the user profile data from your backend
//   // Replace 'https://your-backend.com/api/user-profile' with your actual API endpoint
//   const res = await fetch('https://your-backend.com/api/user-profile', {
//     headers: {
//       // Optional: Include any necessary headers, like authentication tokens
//     },
//   });
//   const userProfile: UserProfile = await res.json();

//   return {
//     props: {
//       userProfile,
//     },
//   };
// };

// export default Profile;
