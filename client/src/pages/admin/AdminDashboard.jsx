import React from 'react';
import { BookOpen, Globe, Users, BadgeCheck } from 'lucide-react';

import { useGetCoursesQuery } from '@/features/api/courseApi';
import { useGetAllLeadsQuery } from '@/features/api/leadApi';

const Dashboard = () => {
  const { data: courseData, isLoading: coursesLoading } = useGetCoursesQuery();
  const { data: leadData, isLoading: leadsLoading } = useGetAllLeadsQuery();

  const courses = courseData?.courses || [];
  const leads = leadData?.leads || [];

  const totalCourses = courses.length;
  const publishedCourses = courses.filter(
    (course) => course.isPublished,
  ).length;

  const totalLeads = leads.length;
  const convertedLeads = leads.filter(
    (lead) => lead.status === 'converted',
  ).length;

  const loading = coursesLoading || leadsLoading;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950">
        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">
          Loading dashboard...
        </h2>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Courses',
      value: totalCourses,
      icon: BookOpen,
      color: 'text-blue-600',
      bg: 'bg-blue-100 dark:bg-blue-500/10',
    },
    {
      title: 'Published Courses',
      value: publishedCourses,
      icon: Globe,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100 dark:bg-emerald-500/10',
    },
    {
      title: 'Total Leads',
      value: totalLeads,
      icon: Users,
      color: 'text-violet-600',
      bg: 'bg-violet-100 dark:bg-violet-500/10',
    },
    {
      title: 'Converted Leads',
      value: convertedLeads,
      icon: BadgeCheck,
      color: 'text-orange-600',
      bg: 'bg-orange-100 dark:bg-orange-500/10',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6 lg:p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Admin Dashboard
        </h1>

        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
          Monitor your platform performance and student engagement.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    {stat.title}
                  </p>

                  <h2 className="text-4xl font-bold mt-3 text-slate-900 dark:text-white">
                    {stat.value}
                  </h2>
                </div>

                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg}`}
                >
                  <Icon className={stat.color} size={26} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Insights */}
      <div className="mt-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Platform Insights
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Publishing Progress
            </h3>

            <p className="mt-3 text-slate-600 dark:text-slate-400">
              {publishedCourses} out of {totalCourses} courses are currently
              published and visible to students.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Lead Conversion
            </h3>

            <p className="mt-3 text-slate-600 dark:text-slate-400">
              {convertedLeads} out of {totalLeads} student inquiries have been
              successfully converted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
