import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { useAdminLoginMutation } from '@/features/api/authApi';
import { userLoggedIn } from '@/features/authSlice';

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [adminLogin, { isLoading }] = useAdminLoginMutation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await adminLogin(formData).unwrap();

      dispatch(userLoggedIn({ user: res.user }));

      toast.success('Admin login successful');

      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error?.data?.message || 'Admin login failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center mb-5">
            <ShieldCheck
              className="text-blue-600 dark:text-blue-400"
              size={30}
            />
          </div>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Admin Access
          </h1>

          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Secure administrator login portal
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Admin Email"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
          >
            {isLoading ? 'Signing in...' : 'Admin Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
