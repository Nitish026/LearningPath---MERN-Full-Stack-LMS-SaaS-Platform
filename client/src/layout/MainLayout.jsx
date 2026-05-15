import Navbar from '@/components/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useGetUserProfileQuery } from '@/features/api/authApi';
import Footer from '@/components/Footer';

const MainLayout = () => {
  useGetUserProfileQuery();
  return (
    <div>
      <Navbar />
      <div className="pt-16 min-h-[calc(100vh-64px)]">
        <div>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
