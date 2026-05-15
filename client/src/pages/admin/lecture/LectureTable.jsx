import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  PlusCircle,
  PlayCircle,
  Pencil,
  Trash2,
  Loader2,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeleteLectureMutation,
  useGetLecturesQuery,
} from '@/features/api/lectureApi';
import { toast } from 'sonner';

const LectureTable = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const { data, isLoading, isError } = useGetLecturesQuery(courseId);

  const [deleteLecture, { isLoading: isDeleting }] = useDeleteLectureMutation();

  const [selectedLectureId, setSelectedLectureId] = useState(null);

  const lectures = data?.lectures || [];

  const handleDeleteLecture = async () => {
    if (!selectedLectureId) return;

    console.log('DELETING:', selectedLectureId);

    try {
      await deleteLecture(selectedLectureId).unwrap();

      toast.success('Lecture deleted successfully');
      setSelectedLectureId(null);
    } catch (error) {
      console.error('DELETE ERROR:', error);
      toast.error(error?.data?.message || 'Failed to delete lecture');
    }
  };
  if (!courseId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Invalid course.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading lectures...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Failed to fetch lectures.
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Manage Lectures
                </h1>

                <p className="text-slate-500 mt-2">
                  Add, edit, and manage lectures for this course.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/admin/course/${courseId}`)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>

                <Button
                  onClick={() =>
                    navigate(`/admin/course/${courseId}/lectures/create`)
                  }
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Lecture
                </Button>
              </div>
            </div>

            {lectures.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 border rounded-3xl">
                <PlayCircle size={70} className="text-slate-400 mb-5" />

                <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
                  No lectures yet
                </h2>

                <p className="text-slate-500 mt-2">
                  Start by creating your first lecture.
                </p>

                <Button
                  className="mt-6"
                  onClick={() =>
                    navigate(`/admin/course/${courseId}/lectures/create`)
                  }
                >
                  Create First Lecture
                </Button>
              </div>
            ) : (
              <div className="grid gap-5">
                {lectures.map((lecture) => (
                  <div
                    key={lecture._id}
                    className="flex items-center justify-between border rounded-2xl p-5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                        <PlayCircle className="text-slate-600" />
                      </div>

                      <div>
                        <h3 className="font-semibold">
                          Lecture {lecture.order}: {lecture.lectureTitle}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {lecture.isPreviewFree
                            ? 'Free Preview'
                            : 'Paid Content'}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() =>
                          navigate(
                            `/admin/course/${courseId}/lectures/${lecture._id}`,
                          )
                        }
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>

                      <Button
                        variant="destructive"
                        onClick={() => setSelectedLectureId(lecture._id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedLectureId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Delete Lecture?
            </h2>

            <p className="text-slate-500 mt-3">This will permanently delete:</p>

            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• Lecture content</li>
              <li>• Uploaded video</li>
              <li>• Preview access settings</li>
            </ul>

            <p className="mt-4 font-medium text-red-500">
              This action cannot be undone.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-8">
              <Button
                variant="outline"
                onClick={() => setSelectedLectureId(null)}
                className="w-full"
              >
                Cancel
              </Button>

              <Button
                variant="destructive"
                onClick={handleDeleteLecture}
                disabled={isDeleting}
                className="w-full"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Deleting...
                  </>
                ) : (
                  'Delete Permanently'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LectureTable;
