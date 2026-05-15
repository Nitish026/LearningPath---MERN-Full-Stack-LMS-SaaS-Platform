import React from 'react';
import { useGetMyEnrolledCoursesQuery } from '@/features/api/enrollmentApi';
import CourseCard from '@/components/CourseCard';

const MyCourses = () => {
  const { data, isLoading, isError } = useGetMyEnrolledCoursesQuery();

  const courses = data?.courses || [];

  const SkeletonCard = () => (
    <div className="animate-pulse bg-white p-4 rounded-2xl shadow space-y-3">
      <div className="h-48 bg-slate-200 rounded-xl"></div>
      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">My Learning</h2>
          <p className="text-slate-500 mt-2">
            Loading your enrolled programs...
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <h2 className="text-red-500 text-lg font-semibold">
          Failed to load enrolled courses
        </h2>
      </div>
    );
  }

  if (!courses.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-bold text-slate-900">
          No Enrolled Programs
        </h2>

        <p className="text-slate-500 mt-4 max-w-md">
          Once you join a program, it will appear here for quick access.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">My Learning</h2>

          <p className="text-slate-500 mt-2">Continue your academic journey</p>
        </div>

        <div className="bg-white px-5 py-3 rounded-2xl shadow border">
          <span className="text-slate-500 text-sm">Enrolled Programs</span>

          <p className="text-2xl font-bold text-slate-900">{courses.length}</p>
        </div>
      </div>

      {/* Continue Learning */}
      <div>
        <h3 className="text-xl font-semibold mb-5">Continue Learning</h3>

        <CourseCard course={courses[0]} />
      </div>

      {/* All Courses */}
      <div>
        <h3 className="text-xl font-semibold mb-5">All Enrolled Programs</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.filter(Boolean).map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
