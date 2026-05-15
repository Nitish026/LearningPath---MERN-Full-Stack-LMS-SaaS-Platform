import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ArrowLeft,
  PlayCircle,
  Save,
  Loader2,
  UploadCloud,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
  useGetLectureByIdQuery,
  useUpdateLectureMutation,
  useUploadLectureVideoMutation,
} from '@/features/api/lectureApi';

const EditLecture = () => {
  const navigate = useNavigate();
  const { courseId, lectureId } = useParams();

  const { data, isLoading, isError, refetch } =
    useGetLectureByIdQuery(lectureId);

  const [updateLecture, { isLoading: isUpdating }] = useUpdateLectureMutation();

  const [uploadLectureVideo, { isLoading: isUploading }] =
    useUploadLectureVideoMutation();

  const [lectureTitle, setLectureTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    if (data?.lecture) {
      setLectureTitle(data.lecture.lectureTitle || '');
      setDescription(data.lecture.description || '');
      setIsPreviewFree(data.lecture.isPreviewFree || false);
    }
  }, [data]);

  const updateLectureHandler = async (e) => {
    e.preventDefault();

    try {
      await updateLecture({
        lectureId,
        lectureData: {
          lectureTitle,
          description,
          isPreviewFree,
        },
      }).unwrap();

      toast.success('Lecture updated successfully');
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update lecture');
    }
  };

  const uploadVideoHandler = async () => {
    if (!videoFile) {
      toast.error('Please select a video first');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      await uploadLectureVideo({
        lectureId,
        formData,
      }).unwrap();

      toast.success('Video uploaded successfully');
      setVideoFile(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || 'Video upload failed');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (isError || !data?.lecture) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Failed to load lecture
      </div>
    );
  }

  const lecture = data.lecture;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold">
                Edit Lecture {lecture.order}
              </h1>
              <p className="text-slate-500 mt-2">
                Manage lecture content and video.
              </p>
            </div>

            <Button
              variant="outline"
              onClick={() => navigate(`/admin/course/${courseId}/lectures`)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          <form onSubmit={updateLectureHandler} className="space-y-8">
            <div>
              <Label>Lecture Title</Label>
              <Input
                value={lectureTitle}
                onChange={(e) => setLectureTitle(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Description</Label>
              <textarea
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-2 rounded-2xl border p-4"
              />
            </div>

            <div className="flex items-center justify-between border rounded-2xl p-5">
              <div>
                <h3 className="font-semibold">Free Preview</h3>
                <p className="text-sm text-slate-500">Allow preview access</p>
              </div>

              <button
                type="button"
                onClick={() => setIsPreviewFree(!isPreviewFree)}
                className={`px-5 py-2 rounded-full ${
                  isPreviewFree ? 'bg-green-500 text-white' : 'bg-slate-200'
                }`}
              >
                {isPreviewFree ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            <Button type="submit" disabled={isUpdating} className="w-full">
              {isUpdating ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </form>

          {/* VIDEO SECTION */}
          <div className="mt-12 border-t pt-10">
            <h2 className="text-2xl font-bold mb-6">Lecture Video</h2>

            {lecture.videoUrl ? (
              <video
                controls
                className="w-full rounded-2xl border mb-6"
                src={lecture.videoUrl}
              />
            ) : (
              <div className="border border-dashed rounded-3xl py-16 flex flex-col items-center">
                <PlayCircle size={70} className="text-slate-400 mb-4" />
                <p className="text-slate-500">No video uploaded yet</p>
              </div>
            )}

            <div className="mt-6 space-y-4">
              <Input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
              />

              <Button
                onClick={uploadVideoHandler}
                disabled={isUploading}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <UploadCloud className="h-4 w-4 mr-2" />
                    {lecture.videoUrl ? 'Replace Video' : 'Upload Video'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLecture;
