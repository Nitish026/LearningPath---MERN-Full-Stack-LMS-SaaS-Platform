import React, { useState } from 'react';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { useCreateLeadMutation } from '@/features/api/leadApi';

const Contact = () => {
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
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            Contact Learning Paths
          </span>

          <h1 className="text-5xl font-bold text-slate-900 dark:text-white leading-tight">
            Let’s Talk About Your Academic Journey
          </h1>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
            Reach out for academic counseling, learning guidance, or business
            inquiries.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <Mail className="text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Email Support
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mt-3">
              support@learningpaths.com
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <Phone className="text-emerald-600 dark:text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Call Us
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mt-3">
              +91 98765 43210
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <MessageSquare className="text-violet-600 dark:text-violet-400 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Academic Guidance
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mt-3">
              Free personalized counseling
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Book Free Counseling
          </h2>

          <form onSubmit={submitHandler} className="space-y-5">
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
              {isLoading ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
