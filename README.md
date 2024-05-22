# Web application Baanrimnam resort คืออะไร?
เป็น Webapp สำหรับการ Booking บ้านพักของรีสอร์ท โดยมีฟังก์ชั่นการทำงานทั่วไปเช่น sign in & sign up , booking , payment โดยจะมีทั้งหมด 2 สิทธิ์ใหญ่คือ Admin และ Customer

## อธิบาย frontend ของ Web application บ้านริมน้ำรีสอร์ท
เป็นส่วนที่แสดงผม user interface ของ web application ให้ผู้ใช้งานได้เห็น โดยจะมีการ varidate input เบื้องต้นเพื่อป้องกันการโจมตีในรูปแบบ injection และการ Authorization เพื่อป้องกันการใช้งานข้ามสิทธิ์
## โครงสร้างระบบ
1. components เป็นส่วนที่สำหรับการเขียนพวก Headerbar หรือว่า Footer ของหน้า web
2. hooks เป็นส่วนของการทำ Authorization ทั้งหมดในหน้าเว็บ
3. pages เป็นส่วนของการทำหน้า page ต่างๆที่แสดง

    3.1 api เป็นส่วนที่ทำงานด้านหลังของระบบโดยส่วนนี้ผมไว้สำหรับการเขียนเก็บ token ที่เป็น JWT ลง cookies
  
4. public เป็นส่วนที่ไว้สำหรับเก็บรูปภาพ poster icon หรือ logo
5. styles เป็นส่วนที่ใช้สำหรับเก็บไฟล์ CSS ของแต่ละ page
6. units เป็นส่วนที่ทำเพื่อ varidate input ก่อนที่จะทำการ response ไปที่ Backend

 ## การป้องกันระบบ
 1. ป้องกัน SQL injection และ XSS โดยใช้ libary DOMPurify
 2. การ Authorization โดยจะ verify แต่ละ page ว่ามีสิทธิ์ใช้งานไหน โดยสามารถ verify ได้ทั้งจากการคลิ๊กปุ่ม และผ่าน URL
