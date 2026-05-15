import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const DashboardLayout = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = (
    <>
      <Link
        to="/dashboard/profile"
        className={`block ${
          isActive('/dashboard/profile')
            ? 'text-blue-600 font-semibold'
            : 'hover:text-blue-600'
        }`}
      >
        Profile
      </Link>

      <Link
        to="/dashboard/my-courses"
        className={`block ${
          isActive('/dashboard/my-courses')
            ? 'text-blue-600 font-semibold'
            : 'hover:text-blue-600'
        }`}
      >
        My Courses
      </Link>

      <Link
        to="/dashboard/notifications"
        className={`block ${
          isActive('/dashboard/notifications')
            ? 'text-blue-600 font-semibold'
            : 'hover:text-blue-600'
        }`}
      >
        Notifications
      </Link>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ✅ Desktop Sidebar ONLY */}
      <div className="hidden md:block w-64 bg-white shadow p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        {navLinks}
      </div>

      {/* ✅ Main Content */}
      <div className="flex-1 p-4 md:p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
