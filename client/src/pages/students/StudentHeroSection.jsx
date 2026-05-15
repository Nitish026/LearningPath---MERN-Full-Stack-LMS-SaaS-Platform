import React, { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useCreateLeadMutation } from '@/features/api/leadApi';

const StudentHeroSection = () => {
  const navigate = useNavigate();
  const [createLead, { isLoading }] = useCreateLeadMutation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    classLevel: '',
    goal: '',
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const { name, email, phone, classLevel, goal } = formData;

    if (!name || !email || !phone || !classLevel || !goal) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      await createLead(formData).unwrap();

      toast.success('Inquiry submitted successfully');

      setFormData({
        name: '',
        email: '',
        phone: '',
        classLevel: '',
        goal: '',
      });
    } catch (error) {
      toast.error(error?.data?.message || 'Submission failed');
    }
  };

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center py-16">
        {/* LEFT */}
        <div>
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            Trusted by 1000+ Learners
          </span>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-slate-900 dark:text-white">
            Learn Smarter.
            <br />
            Track Progress.
            <br />
            Achieve Excellence.
          </h1>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
            Structured academic learning for school students, competitive exams,
            and future achievers with real progress tracking.
          </p>

          <div className="mt-8">
            <button
              onClick={() => navigate('/courses')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition shadow-sm"
            >
              Explore Courses
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Book Free Academic Counseling
          </h2>

          <p className="text-slate-500 dark:text-slate-400 mt-2 mb-6">
            Get personalized academic guidance.
          </p>

          <form onSubmit={submitHandler} className="space-y-4">
            <input
              name="name"
              value={formData.name}
              onChange={changeHandler}
              placeholder="Student Name"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
            />

            <input
              name="email"
              value={formData.email}
              onChange={changeHandler}
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={changeHandler}
              placeholder="Phone Number"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
            />

            <select
              name="classLevel"
              value={formData.classLevel}
              onChange={changeHandler}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
            >
              <option value="">Select Class</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 11">Class 11</option>
              <option value="Class 12">Class 12</option>
              <option value="CUET">CUET</option>
            </select>

            <select
              name="goal"
              value={formData.goal}
              onChange={changeHandler}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
            >
              <option value="">Learning Goal</option>
              <option value="Boards Preparation">Boards Preparation</option>
              <option value="Competitive Exams">Competitive Exams</option>
              <option value="Mathematics Mastery">Mathematics Mastery</option>
              <option value="Career Guidance">Career Guidance</option>
            </select>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition disabled:opacity-60"
            >
              {isLoading ? 'Submitting...' : 'Get Free Guidance'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default StudentHeroSection;
