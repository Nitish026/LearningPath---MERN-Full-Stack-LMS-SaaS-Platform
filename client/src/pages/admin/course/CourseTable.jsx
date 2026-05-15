import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, BookOpen, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetCoursesQuery } from '@/features/api/courseApi';

const CourseTable = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetCoursesQuery();

  const courses = data?.courses || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
        <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Loading courses...
        </h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
        <h1 className="text-lg font-semibold text-red-500">
          {error?.data?.message || 'Failed to fetch courses'}
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Course Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Manage, edit, and organize all your courses.
          </p>
        </div>

        <Button
          onClick={() => navigate('/admin/course/create')}
          className="gap-2 shadow-md"
        >
          <PlusCircle size={18} />
          Create New Course
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-gray-200 dark:border-slate-800 p-4 mb-8">
        <div className="flex items-center gap-3">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full bg-transparent outline-none text-sm text-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Empty State */}
      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <BookOpen size={60} className="text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
            No courses found
          </h2>
          <p className="text-gray-500 mt-2">
            Create your first course to get started.
          </p>

          <Button
            onClick={() => navigate('/admin/course/create')}
            className="mt-6 gap-2"
          >
            <PlusCircle size={18} />
            Create Course
          </Button>
        </div>
      ) : (
        /* Courses Grid */
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-slate-800 overflow-hidden"
            >
              {/* Thumbnail */}
              <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden">
                {course.courseThumbnail ? (
                  <img
                    src={course.courseThumbnail}
                    alt={course.courseTitle}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen size={50} className="text-white" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-lg text-gray-900 dark:text-white">
                    {course.courseTitle}
                  </h2>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      course.isPublished
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {course.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-2">{course.category}</p>

                <p className="text-sm text-gray-400 mt-1">
                  Level: {course.courseLevel}
                </p>

                <div className="mt-5 flex items-center justify-between text-sm">
                  <div>
                    <p className="text-gray-400">Price</p>
                    <p className="font-semibold">₹{course.coursePrice || 0}</p>
                  </div>

                  <div>
                    <p className="text-gray-400">Students</p>
                    <p className="font-semibold">
                      {course.enrolledStudents?.length || 0}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-6 gap-2"
                  onClick={() => navigate(`/admin/course/${course._id}`)}
                >
                  <Pencil size={16} />
                  Edit Course
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseTable;
