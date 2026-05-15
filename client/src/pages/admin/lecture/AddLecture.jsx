import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, PlayCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useCreateLectureMutation } from '@/features/api/lectureApi';

const AddLecture = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [lectureTitle, setLectureTitle] = useState('');
  const [description, setDescription] = useState('');
  const [order, setOrder] = useState('');
  const [isPreviewFree, setIsPreviewFree] = useState(false);

  const [createLecture, { isLoading }] = useCreateLectureMutation();

  const createLectureHandler = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    if (!courseId) {
      toast.error('Invalid course');
      return;
    }

    if (!lectureTitle.trim()) {
      toast.error('Lecture title is required');
      return;
    }

    if (lectureTitle.trim().length > 120) {
      toast.error('Lecture title must be under 120 characters');
      return;
    }

    if (!order || Number(order) < 1) {
      toast.error('Lecture order must be at least 1');
      return;
    }

    try {
      const response = await createLecture({
        courseId,
        lectureData: {
          lectureTitle: lectureTitle.trim(),
          description: description.trim(),
          order: Number(order),
          isPreviewFree,
        },
      }).unwrap();

      toast.success('Lecture created successfully');

      setLectureTitle('');
      setDescription('');
      setOrder('');
      setIsPreviewFree(false);

      navigate(`/admin/course/${courseId}/lectures/${response.lecture._id}`);
    } catch (error) {
      console.error('CREATE LECTURE ERROR:', error);

      toast.error(error?.data?.message || 'Failed to create lecture');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Add Lecture
              </h1>

              <p className="text-slate-500 mt-2">
                Create lecture details, then upload the video.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/admin/course/${courseId}/lectures`)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          <form onSubmit={createLectureHandler} className="space-y-8">
            {/* Lecture Title */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Lecture Title</Label>

              <Input
                value={lectureTitle}
                onChange={(e) => setLectureTitle(e.target.value)}
                placeholder="Introduction to React"
                className="h-12 rounded-xl"
                maxLength={120}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Description</Label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write lecture description..."
                rows={6}
                className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-sm outline-none focus:ring-2 focus:ring-slate-300 dark:bg-slate-900 dark:border-slate-700"
              />
            </div>

            {/* Lecture Order */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Lecture Order</Label>

              <Input
                type="number"
                min="1"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                placeholder="1"
                className="h-12 rounded-xl"
              />
            </div>

            {/* Free Preview */}
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Free Preview
                </h3>

                <p className="text-sm text-slate-500">
                  Allow students to watch this lecture for free.
                </p>
              </div>

              <Switch
                checked={isPreviewFree}
                onCheckedChange={setIsPreviewFree}
              />
            </div>

            {/* Video Placeholder */}
            <div className="flex flex-col items-center justify-center py-12 border rounded-2xl border-dashed">
              <PlayCircle size={60} className="text-slate-400 mb-4" />

              <h2 className="text-lg font-semibold">Video upload comes next</h2>

              <p className="text-sm text-slate-500 mt-2">
                After creating the lecture, you’ll upload the video.
              </p>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl"
            >
              {isLoading ? 'Creating Lecture...' : 'Create Lecture'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLecture;
