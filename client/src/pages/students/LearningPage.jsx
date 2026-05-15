import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
  BookOpen,
  CheckCircle2,
  Lock,
  PlayCircle,
  GraduationCap,
} from 'lucide-react';
import { useGetCourseForLearningQuery } from '@/features/api/courseApi';
import {
  useMarkLectureCompleteMutation,
  useGetCourseProgressQuery,
} from '@/features/api/progressApi';

const LearningPage = () => {
  const { courseId } = useParams();

  const { data, isLoading, isError } = useGetCourseForLearningQuery(courseId);

  const course = data?.course;
  const fullAccess = data?.fullAccess;

  const { data: progressData } = useGetCourseProgressQuery(courseId, {
    skip: !fullAccess,
  });

  const [markLectureComplete, { isLoading: isMarking }] =
    useMarkLectureCompleteMutation();

  const [selectedLecture, setSelectedLecture] = useState(null);

  const progress = progressData?.progress || 0;
  const completedLectures = progressData?.completedLectures || [];

  useEffect(() => {
    if (!course?.lectures?.length) return;

    const lastWatched = progressData?.lastWatchedLecture;

    if (lastWatched) {
      const lecture = course.lectures.find((l) => l._id === lastWatched);
      if (lecture) {
        setSelectedLecture(lecture);
        return;
      }
    }

    setSelectedLecture(course.lectures[0]);
  }, [course, progressData]);

  const handleLectureSelect = (lecture) => {
    if (!fullAccess && !lecture.isPreviewFree) {
      toast.error('Enroll to unlock this module');
      return;
    }

    setSelectedLecture(lecture);
  };

  const handleMarkComplete = async () => {
    if (!selectedLecture) return;

    try {
      await markLectureComplete({
        courseId,
        lectureId: selectedLecture._id,
      }).unwrap();

      toast.success('Module marked complete');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update progress');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950">
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200">
          Loading classroom...
        </h2>
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950">
        <h2 className="text-xl font-semibold text-red-500">
          Failed to load classroom
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 transition-colors duration-300">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div>
              <p className="uppercase tracking-[0.25em] text-xs text-blue-600 dark:text-blue-400 font-semibold">
                Learning Classroom
              </p>

              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mt-4">
                {course.courseTitle}
              </h1>

              <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl leading-relaxed">
                {course.description || 'Structured guided learning experience.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 min-w-[320px]">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
                <BookOpen className="text-blue-600 dark:text-blue-400 mb-3" />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Modules
                </p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                  {course.lectures.length}
                </h3>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
                <GraduationCap className="text-emerald-600 dark:text-emerald-400 mb-3" />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Progress
                </p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                  {progress}%
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="bg-black aspect-video">
                {selectedLecture?.videoUrl ? (
                  <video
                    src={selectedLecture.videoUrl}
                    controls
                    controlsList="nodownload"
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300 text-lg">
                    Video unavailable
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
              <div className="flex flex-col md:flex-row justify-between gap-6 items-start">
                <div className="flex-1">
                  <p className="text-sm uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold">
                    Chapter {selectedLecture?.order}
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-4">
                    {selectedLecture?.lectureTitle}
                  </h2>

                  <p className="text-slate-600 dark:text-slate-400 mt-5 leading-relaxed text-base">
                    {selectedLecture?.description ||
                      'Academic explanation and learning guidance for this module.'}
                  </p>
                </div>

                {fullAccess && (
                  <button
                    onClick={handleMarkComplete}
                    disabled={isMarking}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-sm rounded-xl font-medium transition disabled:opacity-60 whitespace-nowrap shadow-sm"
                  >
                    {isMarking ? 'Updating...' : 'Mark Complete'}
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
              <div className="flex justify-between mb-5">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Progress Tracker
                </h3>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {progress}%
                </span>
              </div>

              <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="text-slate-500 dark:text-slate-400 mt-4">
                Complete modules to track your learning journey.
              </p>
            </div>
          </div>

          <div>
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-20 p-6 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Course Modules
              </h2>

              <p className="text-slate-500 dark:text-slate-400 mt-2">
                {course.lectures.length} chapters available
              </p>

              <div className="space-y-4 mt-8 max-h-[75vh] overflow-y-auto pr-2">
                {course.lectures.map((lecture) => {
                  const isLocked = !fullAccess && !lecture.isPreviewFree;
                  const isCompleted = completedLectures.includes(lecture._id);
                  const isActive = selectedLecture?._id === lecture._id;

                  return (
                    <button
                      key={lecture._id}
                      onClick={() => handleLectureSelect(lecture)}
                      className={`w-full text-left rounded-2xl border p-5 transition ${
                        isActive
                          ? 'bg-blue-50 border-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100 dark:bg-slate-950 dark:border-slate-800 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className="mt-1">
                          {isLocked ? (
                            <Lock className="text-slate-500" size={18} />
                          ) : isCompleted ? (
                            <CheckCircle2
                              className="text-emerald-600 dark:text-emerald-400"
                              size={18}
                            />
                          ) : (
                            <PlayCircle
                              className="text-blue-600 dark:text-blue-400"
                              size={18}
                            />
                          )}
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            Chapter {lecture.order}
                          </p>

                          <h3 className="font-semibold text-slate-900 dark:text-white mt-2 leading-snug">
                            {lecture.lectureTitle}
                          </h3>

                          {lecture.isPreviewFree && (
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">
                              Preview Available
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
