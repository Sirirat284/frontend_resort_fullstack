// pages/superadmin/index.tsx
import React from 'react';
import Header from '../../../components/admin/Header';
import Menu from '../../../components/menu/superadmin';
import Submenu from '../../../components/menu/superAdminSubMenu';

interface StayReport {
  date: string;
  totalGuests: number;
  totalBookings: number;
}

const SuperAdminDashboard = () => {

  return (
    <div >
        <Header />
      <div >
        <Menu/>
        <Submenu/>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
