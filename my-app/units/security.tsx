import DOMPurify from 'dompurify';

export const handleSecurityAlert = (): void => {
    console.warn('Potential XSS attack detected.');
    alert('เราได้ตรวจพบพฤติกรรมที่ไม่ปลอดภัยในการป้อนข้อมูลของคุณ คุณจะถูกล็อกเอาต์เพื่อความปลอดภัยของคุณเอง.');

    sessionStorage.removeItem('userID');
    sessionStorage.removeItem('role');
    localStorage.removeItem('bookingDetails');

    window.location.href = '/login';
};

export const sanitizeInput = (input: string): string => {
    // Use DOMPurify to clean the input
    const cleanInput = DOMPurify.sanitize(input);

    if (cleanInput!==input) {
        handleSecurityAlert();
        throw new Error('Invalid input: dangerous content detected.');
    }

    const tagsToReplace: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };

    return cleanInput.replace(/[&<>"']/g, (tag: string) => tagsToReplace[tag] || tag);
};
