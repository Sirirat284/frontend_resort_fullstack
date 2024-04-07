// pages/superadmin/index.tsx
import { useEffect, useState } from 'react';
import Header from '../../../components/admin/Header';
import Menu from '../../../components/menu/superadmin';
import Submenu from '../../../components/menu/superAdminSubMenu';
import { s_ad_auth } from '../../../hooks/adminAuth';

const SuperAdminDashboard = () => {

  s_ad_auth();

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
