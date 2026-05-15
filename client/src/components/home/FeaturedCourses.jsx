import React from 'react';
import { useGetPublishedCoursesQuery } from '@/features/api/courseApi';
import CourseCard from '@/components/CourseCard';

const FeaturedCourses = () => {
  const { data, isLoading } = useGetPublishedCoursesQuery();

  const courses = data?.courses?.slice(0, 3) || [];

  if (isLoading) {
    return (
      <section className="bg-white dark:bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-xl text-slate-600 dark:text-slate-300">
          Loading featured courses...
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            Popular Learning Programs
          </span>

          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
            Featured Courses
          </h2>

          <p className="mt-5 text-lg text-slate-600 dark:text-slate-400">
            Start with our most popular structured academic programs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
