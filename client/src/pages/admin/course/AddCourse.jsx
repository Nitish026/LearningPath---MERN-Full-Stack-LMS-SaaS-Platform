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
import { Loader2, ArrowLeft, BookOpen } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCreateCourseMutation } from '@/features/api/courseApi';

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

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseLevel, setCourseLevel] = useState('');
  const [category, setCategory] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [createCourse, { isLoading }] = useCreateCourseMutation();

  const navigate = useNavigate();

  const createCourseHandler = async (e) => {
    e.preventDefault();

    if (!courseTitle.trim()) {
      toast.error('Course title is required');
      return;
    }

    if (!category) {
      toast.error('Please select a category');
      return;
    }

    if (!courseLevel) {
      toast.error('Please select a course level');
      return;
    }

    try {
      const result = await createCourse({
        courseTitle,
        category,
        courseLevel,
        coursePrice,
      }).unwrap();

      toast.success(result?.message || 'Course created successfully');

      navigate('/admin/course');
    } catch (error) {
      console.log('FULL ERROR:', error);

      toast.error(error?.data?.message || 'Failed to create course');
    }
  };

  const courseLevels = ['Beginner', 'Intermediate', 'Advanced'];
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-blue-100 dark:bg-blue-900/30">
              <BookOpen className="h-7 w-7" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Create New Course
              </h1>
              <p className="text-slate-500 mt-1">
                Set up your course and start building your learning experience.
              </p>
            </div>
          </div>

          <form onSubmit={createCourseHandler} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Course Title</Label>
              <Input
                type="text"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="e.g. Complete MERN Stack Bootcamp"
                className="h-12 rounded-xl"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Course Category
              </Label>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full h-14 rounded-2xl border border-slate-300 bg-white px-4 text-base shadow-sm hover:border-slate-400 focus:ring-2 focus:ring-slate-300 dark:bg-slate-900 dark:border-slate-700">
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>

                <SelectContent
                  className="
    bg-white/95
    backdrop-blur-md
    border border-slate-200
    shadow-2xl
    rounded-2xl
    z-50
    dark:bg-slate-900/95
    dark:border-slate-700
  "
                >
                  <SelectGroup>
                    <SelectLabel className="text-slate-500 px-2">
                      Categories
                    </SelectLabel>

                    {categories.map((item) => (
                      <SelectItem
                        key={item}
                        value={item}
                        className="rounded-xl mx-1 my-1 cursor-pointer text-base"
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {category && (
                <p className="text-sm text-slate-500">
                  Selected category:{' '}
                  <span className="font-medium">{category}</span>
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Course Level
              </Label>

              <Select value={courseLevel} onValueChange={setCourseLevel}>
                <SelectTrigger className="w-full h-14 rounded-2xl border border-slate-300 bg-white px-4 text-base shadow-sm hover:border-slate-400 focus:ring-2 focus:ring-slate-300 dark:bg-slate-900 dark:border-slate-700">
                  <SelectValue placeholder="Choose course level" />
                </SelectTrigger>

                <SelectContent className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl">
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

              {courseLevel && (
                <p className="text-sm text-slate-500">
                  Selected level:{' '}
                  <span className="font-medium">{courseLevel}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Course Price</Label>
              <Input
                type="number"
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
                placeholder="Enter course price"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/course')}
                className="h-12 px-6 rounded-xl"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 px-8 rounded-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Course...
                  </>
                ) : (
                  'Create Course'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
