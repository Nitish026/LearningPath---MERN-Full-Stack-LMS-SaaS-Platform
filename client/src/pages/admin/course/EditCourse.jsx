import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Save, Upload, BookOpen, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseThumbnailMutation,
  useTogglePublishCourseMutation,
} from '@/features/api/courseApi';
import { toast } from 'sonner';

const categories = [
  'Next JS',
  'Data Science',
  'Frontend Development',
  'Fullstack Development',
  'MERN Stack Development',
  'Javascript',
  'Python',
  'Docker',
  'MongoDB',
  'HTML',
];

const courseLevels = ['Beginner', 'Intermediate', 'Advanced'];

const EditCourse = () => {
  const navigate = useNavigate();

  const { courseId } = useParams();

  const { data, isLoading, refetch } = useGetCourseByIdQuery(courseId);

  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();
  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();
  const [updateCourseThumbnail, { isLoading: isUploading }] =
    useUpdateCourseThumbnailMutation();

  const course = data?.course;

  const [courseTitle, setCourseTitle] = useState('');
  const [category, setCategory] = useState('');
  const [courseLevel, setCourseLevel] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [subTitle, setSubTitle] = useState('');
  const [mentorMessage, setMentorMessage] = useState('');
  const [learningMode, setLearningMode] = useState('');
  const [benefits, setBenefits] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [learningRoadmap, setLearningRoadmap] = useState('');

  useEffect(() => {
    if (course) {
      setCourseTitle(course.courseTitle || '');
      setSubTitle(course.subTitle || '');
      setCategory(course.category || '');
      setCourseLevel(course.courseLevel || '');
      setCoursePrice(course.coursePrice || '');
      setDescription(course.description || '');
      setIsPublished(course.isPublished || false);

      setMentorMessage(course.mentorMessage || '');
      setLearningMode(course.learningMode || 'Mentor Guided');

      setBenefits(
        Array.isArray(course.benefits) ? course.benefits.join('\n') : '',
      );

      setTargetAudience(
        Array.isArray(course.targetAudience)
          ? course.targetAudience.join('\n')
          : '',
      );

      setLearningRoadmap(
        Array.isArray(course.learningRoadmap)
          ? course.learningRoadmap.map((item) => item.title).join('\n')
          : '',
      );
    }
  }, [course]);

  const [togglePublishCourse, { isLoading: isPublishing }] =
    useTogglePublishCourseMutation();

  const saveCourseHandler = async () => {
    if (!courseTitle.trim()) {
      toast.error('Course title is required');
      return;
    }

    if (!category) {
      toast.error('Please select category');
      return;
    }

    if (!courseLevel) {
      toast.error('Please select course level');
      return;
    }

    try {
      await updateCourse({
        courseId,
        courseData: {
          courseTitle,
          subTitle,
          category,
          courseLevel,
          coursePrice,
          description,
          mentorMessage,
          learningMode,

          benefits: benefits
            .split('\n')
            .map((item) => item.trim())
            .filter(Boolean),

          targetAudience: targetAudience
            .split('\n')
            .map((item) => item.trim())
            .filter(Boolean),

          learningRoadmap: learningRoadmap
            .split('\n')
            .map((item) => ({
              title: item.trim(),
            }))
            .filter((item) => item.title),

          isPublished,
        },
      }).unwrap();

      toast.success('Course updated successfully');
      navigate('/admin/course');
    } catch (error) {
      toast.error(error?.data?.message || 'Update failed');
    }
  };

  const uploadThumbnailHandler = async () => {
    if (!thumbnail) {
      toast.error('Please select a thumbnail');
      return;
    }

    const formData = new FormData();
    formData.append('thumbnail', thumbnail);

    try {
      await updateCourseThumbnail({
        courseId,
        formData,
      }).unwrap();

      await refetch();

      setThumbnail(null);

      toast.success('Thumbnail updated successfully');
    } catch (error) {
      toast.error(error?.data?.message || 'Thumbnail upload failed');
    }
  };

  const deleteCourseHandler = async () => {
    try {
      await deleteCourse(courseId).unwrap();

      toast.success('Course deleted successfully');

      navigate('/admin/course');
    } catch (error) {
      toast.error(error?.data?.message || 'Delete failed');
    }
  };

  const handlePublishToggle = async () => {
    try {
      await togglePublishCourse({
        courseId,
        isPublished: !course?.isPublished,
      }).unwrap();

      toast.success(
        course?.isPublished
          ? 'Course moved to draft'
          : 'Course published successfully',
      );
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update publish status');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-lg font-semibold">Loading course...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-10">
          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="p-4 rounded-2xl bg-blue-100 dark:bg-blue-900/30">
              <BookOpen className="h-7 w-7" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Edit Course
              </h1>
              <p className="text-slate-500 mt-1">
                Update your course details and publish when ready.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Title */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Course Title</Label>
              <Input
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="Complete MERN Stack Bootcamp"
                className="h-12 rounded-xl"
              />
            </div>

            {/* Category */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Category</Label>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-14 rounded-2xl">
                  <SelectValue placeholder="Choose category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>

                    {categories.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Level */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Course Level</Label>

              <Select value={courseLevel} onValueChange={setCourseLevel}>
                <SelectTrigger className="h-14 rounded-2xl">
                  <SelectValue placeholder="Choose level" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Levels</SelectLabel>

                    {courseLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Course Price (₹)</Label>
              <Input
                type="number"
                value={coursePrice}
                onChange={(e) => setCoursePrice(Number(e.target.value))}
                placeholder="2999"
                className="h-12 rounded-xl"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Description</Label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write course description..."
                rows={6}
                className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-sm outline-none focus:ring-2 focus:ring-slate-300 dark:bg-slate-900 dark:border-slate-700"
              />
            </div>

            {/* Subtitle */}
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Input
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                placeholder="Structured program for serious aspirants"
              />
            </div>

            {/* Mentor Message */}
            <div className="space-y-2">
              <Label>Mentor Message</Label>
              <textarea
                value={mentorMessage}
                onChange={(e) => setMentorMessage(e.target.value)}
                rows={5}
                className="w-full rounded-2xl border p-4"
                placeholder="Write a message students will see..."
              />
            </div>

            {/* Learning Mode */}
            <div className="space-y-2">
              <Label>Learning Mode</Label>
              <Input
                value={learningMode}
                onChange={(e) => setLearningMode(e.target.value)}
                placeholder="Mentor Guided"
              />
            </div>

            {/* Learning Roadmap */}
            <div className="space-y-2">
              <Label>Learning Roadmap</Label>
              <textarea
                value={learningRoadmap}
                onChange={(e) => setLearningRoadmap(e.target.value)}
                rows={5}
                className="w-full rounded-2xl border p-4"
                placeholder={`Foundation Building
Core Concept Mastery
Practice & Assessment`}
              />
            </div>

            {/* Thumbnail */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Course Thumbnail</Label>

              <label className="flex items-center justify-center gap-3 border-2 border-dashed border-slate-300 rounded-2xl p-8 cursor-pointer hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 transition">
                <Upload className="h-5 w-5" />

                <span className="text-sm text-slate-600 dark:text-slate-300">
                  Select Thumbnail
                </span>

                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />
              </label>

              {thumbnail && (
                <div className="space-y-3">
                  <p className="text-sm text-slate-500">
                    Selected: {thumbnail.name}
                  </p>

                  <Button
                    onClick={uploadThumbnailHandler}
                    disabled={isUploading}
                    className="w-full"
                  >
                    {isUploading ? 'Uploading...' : 'Upload Thumbnail'}
                  </Button>
                </div>
              )}

              {course?.courseThumbnail && (
                <div className="mt-4">
                  <p className="text-sm text-slate-500 mb-2">
                    Current Thumbnail
                  </p>

                  <img
                    src={course.courseThumbnail}
                    alt="Course Thumbnail"
                    className="w-full h-56 object-cover rounded-2xl border"
                  />
                </div>
              )}
            </div>

            {/* Publish Toggle */}
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Publish Course
                </h3>
                <p className="text-sm text-slate-500">
                  Make this course visible to students.
                </p>
              </div>

              <Button
                onClick={handlePublishToggle}
                disabled={isPublishing}
                className={`px-5 py-2 rounded-full font-medium ${
                  course?.isPublished
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {isPublishing
                  ? 'Updating...'
                  : course?.isPublished
                    ? 'Published'
                    : 'Draft'}
              </Button>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                onClick={() => navigate('/admin/course')}
                className="h-12 px-6 rounded-xl"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              <Button
                className="h-12 px-8 rounded-xl"
                onClick={saveCourseHandler}
                disabled={isUpdating}
              >
                <Save className="h-4 w-4 mr-2" />
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </Button>

              <Button
                onClick={() => navigate(`/admin/course/${courseId}/lectures`)}
                className="h-12 px-8 rounded-xl"
              >
                Manage Lectures
              </Button>

              <Button
                variant="destructive"
                onClick={deleteCourseHandler}
                disabled={isDeleting}
                className="h-12 px-8 rounded-xl"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isDeleting ? 'Deleting...' : 'Delete Course'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
