// PolicyModal.tsx
import React from 'react';
import styles from '../styles/PolicyModal.module.css'; // Assuming you have a CSS module for styling

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>นโยบายการสมัครสมาชิกเว็บไซต์ของBaan rim nam resort</h2>
        </div>
        <div className={styles.modalBody}>
          <p>1. การยอมรับข้อกำหนดและเงื่อนไข:เมื่อท่านสมัครสมาชิกเว็บไซต์ของBaan rim nam resort, ท่านยินยอมที่จะปฏิบัติตามข้อกำหนดและเงื่อนไขที่ระบุไว้ในนโยบายนี้ และข้อกำหนดอื่นๆ ที่เว็บไซต์อาจจะกำหนดไว้.</p>
          <p>2. ข้อมูลส่วนบุคคล:เราจะเก็บรักษาข้อมูลส่วนบุคคลของท่านอย่างปลอดภัยและเป็นความลับ ข้อมูลดังกล่าวจะถูกใช้เพื่อการบริการและการสื่อสารระหว่างรีสอร์ทกับท่านเท่านั้น.</p>
          <p>3. การสมัครสมาชิก:ท่านสามารถสมัครสมาชิกผ่านเว็บไซต์โดยกรอกข้อมูลที่จำเป็นในแบบฟอร์มการสมัคร ท่านต้องให้ข้อมูลที่ถูกต้องและครบถ้วน.</p>
          <p>4. ความรับผิดชอบของสมาชิก:สมาชิกมีความรับผิดชอบในการรักษาความลับของบัญชีและรหัสผ่านของตนเอง Baan rim nam resort จะไม่รับผิดชอบต่อการใช้บัญชีที่ไม่เหมาะสม.</p>
          <p>5. การแก้ไขนโยบาย:Baan rim nam resort มีสิทธิ์ในการแก้ไขนโยบายการสมัครสมาชิกเมื่อไหร่ก็ตามโดยไม่ต้องแจ้งให้ท่านทราบล่วงหน้า. การเปลี่ยนแปลงจะมีผลบังคับใช้ทันทีที่ได้รับการเผยแพร่บนเว็บไซต์.</p>
          <p>6. การยกเลิกสมาชิก:สมาชิกสามารถยกเลิกการเป็นสมาชิกได้ทุกเมื่อโดยการแจ้งให้ Baan rim nam resort ทราบผ่านช่องทางการติดต่อที่ระบุไว้บนเว็บไซต์.</p>
        </div>
        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.modalAcceptButton}>ยอมรับ</button>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
