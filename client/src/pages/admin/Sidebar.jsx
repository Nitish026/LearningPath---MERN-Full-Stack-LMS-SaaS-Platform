import {
  ChartNoAxesColumn,
  SquareLibrary,
  Users,
  IndianRupee,
} from 'lucide-react';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const sidebarItems = [
  {
    name: 'Dashboard',
    path: '/admin/dashboard',
    icon: ChartNoAxesColumn,
  },
  {
    name: 'Courses',
    path: '/admin/course',
    icon: SquareLibrary,
  },
  {
    name: 'Leads',
    path: '/admin/leads',
    icon: Users,
  },
  {
    name: 'Payments',
    path: '/admin/payments',
    icon: IndianRupee,
  },
];

const Sidebar = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden lg:block w-[280px] border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 sticky top-16 h-[calc(100vh-64px)] p-6">
        <div className="space-y-3">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium
                  ${
                    isActive
                      ? 'bg-blue-100 text-blue-600 dark:bg-slate-800'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800'
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 bg-gray-50 dark:bg-slate-950">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
