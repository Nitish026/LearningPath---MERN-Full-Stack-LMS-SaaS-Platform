import React from 'react';
import CourseCard from '@/components/CourseCard';
import { useGetPublishedCoursesQuery } from '@/features/api/courseApi';

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCoursesQuery();

  const courses = data?.courses || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Loading courses...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-red-500">
          Failed to load courses.
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Explore Our Courses
          </h2>

          <p className="text-gray-500 mt-2">
            Choose from our top published courses and start learning today.
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-700">
              No published courses yet
            </h3>

            <p className="text-gray-500 mt-2">Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
