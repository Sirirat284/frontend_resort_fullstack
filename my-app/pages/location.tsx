import React from 'react';
import Image from 'next/image'; // Importing Next.js Image component for optimized images
import Header from '../components/HeaderBar';
import Footer from '../components/Footer';
import styles from '../styles/location.module.css';

const Location = () => {
  return (
    <div>
      <Header/>
      <div className={styles.locationContainer}>
        <div className={styles.locationItem}>
            <div className={styles.imageWrapper}>
            {/* Using Next.js Image component for optimization */}
            <Image src="/location/Rectangle 200.png" alt="Location Image" width={500} height={400} className={styles.locationImage} priority />
            </div>
            <div className={styles.contentWrapper}>
            <h2 className={styles.locationTitle}>ศูนย์การเรียนรู้ ป่าวังจันทร์</h2>
            <p className={styles.locationDetail}>ระยะทาง 25 กม. (28 นาที)</p>
            </div>
        </div>
        <div className={styles.locationItem}>
            <div className={styles.imageWrapper}>
            {/* Using Next.js Image component for optimization */}
            <Image src="/location/Rectangle 201.png" alt="Location Image" width={500} height={300} className={styles.locationImage} priority/>
            </div>
            <div className={styles.contentWrapper}>
            <h2 className={styles.locationTitle}>โรงเรียนกำเนิดวิทย์(KVIS)</h2>
            <p className={styles.locationDetail}>ระยะทาง 25 กม. (28 นาที)</p>
            </div>
        </div>
        <div className={styles.locationItem}>
            <div className={styles.imageWrapper}>
            {/* Using Next.js Image component for optimization */}
            <Image src="/location/Rectangle 202.png" alt="Location Image" width={500} height={300} className={styles.locationImage} priority/>
            </div>
            <div className={styles.contentWrapper}>
            <h2 className={styles.locationTitle}>วัดน้ำตก ธรรมรส</h2>
            <p className={styles.locationDetail}>ระยะทาง 28 กม. (30 นาที)</p>
            </div>
        </div>
        <div className={styles.locationItem}>
            <div className={styles.imageWrapper}>
            {/* Using Next.js Image component for optimization */}
            <Image src="/location/Rectangle 203.png" alt="Location Image" width={500} height={300} className={styles.locationImage} priority/>
            </div>
            <div className={styles.contentWrapper}>
            <h2 className={styles.locationTitle}>อนุสาวรีย์ สุนทรภู่</h2>
            <p className={styles.locationDetail}>ระยะทาง 31 กม. (32 นาที)</p>
            </div>
        </div>
        <div className={styles.locationItem}>
            <div className={styles.imageWrapper}>
            {/* Using Next.js Image component for optimization */}
            <Image src="/location/Rectangle 204.png" alt="Location Image" width={500} height={300} className={styles.locationImage} priority/>
            </div>
            <div className={styles.contentWrapper}>
            <h2 className={styles.locationTitle}>หาด แหลมแม่พิมพ์</h2>
            <p className={styles.locationDetail}>ระยะทาง 35 กม. (35 นาที)</p>
            </div>
        </div>
        <div className={styles.locationItem}>
            <div className={styles.imageWrapper}>
            {/* Using Next.js Image component for optimization */}
            <Image src="/location/Rectangle 205.png" alt="Location Image" width={500} height={300} className={styles.locationImage} priority />
            </div>
            <div className={styles.contentWrapper}>
            <h2 className={styles.locationTitle}>อุทยานแห่งชาติ เขาชะเมา</h2>
            <p className={styles.locationDetail}>ระยะทาง 27 กม. (28 นาที)</p>
            </div>
        </div>
        <div className={styles.locationItem}>
            <div className={styles.imageWrapper}>
            {/* Using Next.js Image component for optimization */}
            <Image src="/location/Rectangle 206.png" alt="Location Image" width={500} height={300} className={styles.locationImage} priority />
            </div>
            <div className={styles.contentWrapper}>
            <h2 className={styles.locationTitle}>อุโบสถกลางน้ำ วัดชุมนุมใน</h2>
            <p className={styles.locationDetail}>ระยะทาง 8 กม. (10 นาที)</p>
            </div>
        </div>
        <div className={styles.locationItem}>
            <div className={styles.imageWrapper}>
            {/* Using Next.js Image component for optimization */}
            <Image src="/location/Rectangle 207.png" alt="Location Image" width={500} height={300} className={styles.locationImage} priority/>
            </div>
            <div className={styles.contentWrapper}>
            <h2 className={styles.locationTitle}>เรือรบหลวงประแส</h2>
            <p className={styles.locationDetail}>ระยะทาง 35 กม. (38 นาที)</p>
            </div>
        </div>
        <div className={styles.locationItem}>
            <div className={styles.imageWrapper}>
            {/* Using Next.js Image component for optimization */}
            <Image src="/location/Rectangle 208.png" alt="Location Image" width={500} height={300} className={styles.locationImage} priority/>
            </div>
            <div className={styles.contentWrapper}>
            <h2 className={styles.locationTitle}>ทุ่งโปร่งทอง</h2>
            <p className={styles.locationDetail}>ระยะทาง 34 กม. (36 นาที)</p>
            </div>
        </div>
        <div className={styles.locationItem}>
            <div className={styles.imageWrapper}>
            {/* Using Next.js Image component for optimization */}
            <Image src="/location/Rectangle 209.png" alt="Location Image" width={500} height={300} className={styles.locationImage} priority/>
            </div>
            <div className={styles.contentWrapper}>
            <h2 className={styles.locationTitle}>สะพานรักษ์แสม</h2>
            <p className={styles.locationDetail}>ระยะทาง 27 กม. (29 นาที)</p>
            </div>
        </div>
        <div className={styles.locationItem}>
            <div className={styles.imageWrapper}>
            {/* Using Next.js Image component for optimization */}
            <Image src="/location/Rectangle 210.png" alt="Location Image" width={500} height={300} className={styles.locationImage} priority/>
            </div>
            <div className={styles.contentWrapper}>
            <h2 className={styles.locationTitle}>อ่างเก็บน้ำประแส</h2>
            <p className={styles.locationDetail}>ระยะทาง 18 กม. (23 นาที)</p>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Location;
