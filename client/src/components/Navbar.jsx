import React, { useEffect, useState } from 'react';
import {
  School,
  Menu,
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
  LayoutDashboard,
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Darkmode from '@/Darkmode';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLogoutUserMutation } from '@/features/api/authApi';

export function DropdownMenuAvatar() {
  const { user } = useSelector((state) => state.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login';

  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
    } catch {
      toast.error('Logout failed');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || 'Logged out successfully');
      navigate('/login');
    }
  }, [isSuccess, data, navigate]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Avatar>
            <AvatarImage src={user?.photoUrl} alt={user?.name} />
            <AvatarFallback>
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
      >
        {user?.role === 'admin' ? (
          <>
            <DropdownMenuItem onClick={() => navigate('/admin/dashboard')}>
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Admin Dashboard
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={logoutHandler}>
              <LogOutIcon className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                <BadgeCheckIcon className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => navigate('/dashboard/my-courses')}
              >
                <CreditCardIcon className="w-4 h-4 mr-2" />
                My Courses
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => navigate('/dashboard/notifications')}
              >
                <BellIcon className="w-4 h-4 mr-2" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={logoutHandler}>
              <LogOutIcon className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  const isAuthPage = location.pathname === '/login';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center">
            <School className="text-blue-600 dark:text-blue-400" size={22} />
          </div>

          <div>
            <h1 className="font-bold text-slate-900 dark:text-white text-lg">
              Learning Paths
            </h1>
          </div>
        </Link>

        {/* Desktop Nav */}
        {!isAuthPage && (
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-slate-700 dark:text-slate-300 hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/courses"
              className="text-slate-700 dark:text-slate-300 hover:text-blue-600"
            >
              Courses
            </Link>

            <Link
              to="/about"
              className="text-slate-700 dark:text-slate-300 hover:text-blue-600 transition"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-slate-700 dark:text-slate-300 hover:text-blue-600 transition"
            >
              Contact
            </Link>
          </nav>
        )}

        {/* Right */}
        <div className="hidden md:flex items-center gap-4">
          <Darkmode />

          {!isAuthPage &&
            (isAuthenticated ? (
              <DropdownMenuAvatar />
            ) : (
              <Link to="/login">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm">
                  Get Started
                </Button>
              </Link>
            ))}
        </div>

        {/* Mobile */}
        {!isAuthPage && (
          <div className="md:hidden">
            <MobileNavbar />
          </div>
        )}
      </div>
    </header>
  );
};

const MobileNavbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();

  const handleNav = (path) => {
    navigate(path);
    setOpen(false);
  };

  const mobileLogoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      toast.success('Logged out');
      navigate('/login');
      setOpen(false);
    } catch {
      toast.error('Logout failed');
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <Menu className="text-slate-900 dark:text-white" />
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 z-50 transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h2 className="font-bold text-slate-900 dark:text-white">Menu</h2>
          <Darkmode />
        </div>

        <div className="flex flex-col p-6 gap-5">
          <button onClick={() => handleNav('/')}>Home</button>
          <button onClick={() => handleNav('/courses')}>Courses</button>
          <button onClick={() => handleNav('/about')}>About</button>
          <button onClick={() => handleNav('/contact')}>Contact</button>

          {isAuthenticated && user?.role === 'student' && (
            <>
              <button onClick={() => handleNav('/dashboard')}>Dashboard</button>

              <button onClick={() => handleNav('/dashboard/my-courses')}>
                My Learning
              </button>
            </>
          )}

          {isAuthenticated && user?.role === 'admin' && (
            <button onClick={() => handleNav('/admin')}>Admin Panel</button>
          )}

          {!isAuthenticated ? (
            <button onClick={() => handleNav('/login')}>Login</button>
          ) : (
            <button onClick={mobileLogoutHandler} className="text-red-500">
              Sign Out
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
