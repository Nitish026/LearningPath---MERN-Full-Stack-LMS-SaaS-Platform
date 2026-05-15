import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/courses/${course._id}`);
  };

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300 border border-slate-200">
      {/* Thumbnail */}
      <div className="relative w-full h-52 bg-slate-100">
        <img
          src={course.courseThumbnail || '/course-placeholder.png'}
          alt={course.courseTitle}
          className="w-full h-full object-cover"
        />

        {/* Price */}
        <span>
          {course.coursePrice > 0 ? `₹${course.coursePrice}` : 'Free'}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category + Level */}
        <div className="flex gap-2 mb-3">
          <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
            {course.category}
          </span>

          <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
            {course.courseLevel}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-slate-900 line-clamp-2">
          {course.courseTitle}
        </h2>

        {/* Description */}
        <p className="text-slate-500 text-sm mt-3 line-clamp-3 min-h-[72px]">
          {course.description || 'Start learning with this amazing course.'}
        </p>

        {/* CTA */}
        <button
          className="w-full mt-5 bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700 transition"
          onClick={handleClick}
        >
          View Course
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
