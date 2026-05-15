import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPublicCourseByIdQuery } from '@/features/api/courseApi';
import {
  useCheckEnrollmentStatusQuery,
  useEnrollInCourseMutation,
} from '@/features/api/enrollmentApi';
import {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
} from '@/features/api/paymentApi';
import { useNavigate } from 'react-router-dom';

import { toast } from 'sonner';
import {
  BookOpen,
  GraduationCap,
  Lock,
  PlayCircle,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const CourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError } = useGetPublicCourseByIdQuery(id);

  const course = data?.course;

  const [createOrder, { isLoading: isCreatingOrder }] =
    useCreateOrderMutation();

  const [enrollInCourse, { isLoading: isEnrolling }] =
    useEnrollInCourseMutation();

  const [verifyPayment] = useVerifyPaymentMutation();

  const { data: enrollmentData } = useCheckEnrollmentStatusQuery(id);

  const isEnrolled = enrollmentData?.enrolled;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <h1 className="text-xl font-semibold text-slate-700">
          Preparing your academic experience...
        </h1>
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <h1 className="text-xl font-semibold text-red-500">
          Program not found
        </h1>
      </div>
    );
  }

  const handleEnrollment = async () => {
    if (isEnrolled) {
      navigate(`/learn/${id}`);
      return;
    }

    try {
      if (course.coursePrice <= 0) {
        await enrollInCourse(id).unwrap();

        toast.success('Enrolled successfully!');

        navigate(`/learn/${id}`);
        return;
      }

      const orderResponse = await createOrder(id).unwrap();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderResponse.order.amount,
        currency: orderResponse.order.currency,
        name: 'Learning Paths',
        description: course.courseTitle,
        order_id: orderResponse.order.id,

        handler: async function (response) {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: id,
            }).unwrap();

            toast.success('Payment successful! Course unlocked.');

            navigate(`/learn/${id}`);
          } catch (error) {
            toast.error('Payment verification failed');
          }
        },

        theme: {
          color: '#2563eb',
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      toast.error(error?.data?.message || 'Payment failed');
    }
  };
  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,_white_0%,_transparent_40%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 relative">
          <p className="uppercase tracking-[0.35em] text-xs text-blue-300 font-semibold">
            {course.subTitle || 'Digital Academic Program'}
          </p>

          <div className="grid lg:grid-cols-2 gap-14 items-center mt-8">
            {/* LEFT */}
            <div>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 rounded-full bg-blue-500/15 border border-blue-400/20 text-sm">
                  {course.category}
                </span>

                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm">
                  {course.courseLevel}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {course.courseTitle}
              </h1>

              <p className="mt-6 text-slate-300 text-lg leading-relaxed max-w-2xl">
                {course.description ||
                  'A structured academic program designed for concept mastery, guided progression, and confident learning outcomes.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-10">
                <div className="bg-white/5 backdrop-blur rounded-3xl p-5 border border-white/10">
                  <BookOpen className="text-blue-300 mb-3" />

                  <p className="text-slate-400 text-sm">Academic Modules</p>

                  <h3 className="text-2xl font-bold mt-2">
                    {course.lectures?.length || 0}
                  </h3>
                </div>

                <div className="bg-white/5 backdrop-blur rounded-3xl p-5 border border-white/10">
                  <GraduationCap className="text-blue-300 mb-3" />

                  <p className="text-slate-400 text-sm">Learning Format</p>

                  <h3 className="text-2xl font-bold mt-2">
                    {course.learningMode || 'Mentor Guided'}
                  </h3>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div>
              <img
                src={course.courseThumbnail || '/course-placeholder.png'}
                alt={course.courseTitle}
                className="w-full h-[460px] object-cover rounded-[2rem] shadow-2xl border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">
          {/* Mentor Note */}
          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
            <p className="uppercase tracking-[0.25em] text-xs text-blue-600 font-semibold mb-4">
              Mentor Note
            </p>

            <h2 className="text-2xl font-bold text-slate-900 leading-relaxed">
              {course.mentorMessage ||
                'A structured academic program built for serious learners.'}
            </h2>
          </div>

          {/* Learning Journey */}
          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-slate-900">
                Learning Journey
              </h2>

              <span className="text-sm text-slate-500">
                Structured Progression
              </span>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6">
              {(course.learningRoadmap?.length
                ? course.learningRoadmap
                : [
                    { title: 'Foundation Building' },
                    { title: 'Core Concept Mastery' },
                    { title: 'Practice & Assessment' },
                  ]
              ).map((phase, index) => (
                <React.Fragment key={index}>
                  <div className="flex-1 w-full bg-slate-100 rounded-3xl p-6 border border-slate-200">
                    <p className="text-xs uppercase tracking-widest text-blue-600 font-semibold">
                      Phase {index + 1}
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mt-4">
                      {phase.title}
                    </h3>
                  </div>

                  {index !==
                    (course.learningRoadmap?.length
                      ? course.learningRoadmap.length
                      : 3) -
                      1 && (
                    <ArrowRight className="hidden md:block text-slate-400" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          {/* Lessons */}
          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
            <div className="mb-10">
              <p className="uppercase tracking-[0.25em] text-xs text-blue-600 font-semibold">
                Academic Modules
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-4">
                Program Structure
              </h2>
            </div>

            {course.lectures.length === 0 ? (
              <p className="text-slate-500">
                Program modules will be added soon.
              </p>
            ) : (
              <div className="space-y-5">
                {course.lectures.map((lecture) => (
                  <div
                    key={lecture._id}
                    className="rounded-3xl border border-slate-200 p-6 hover:shadow-md transition bg-slate-50"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white border flex items-center justify-center shadow-sm">
                          {lecture.isPreviewFree ? (
                            <PlayCircle className="text-green-500" />
                          ) : (
                            <Lock className="text-slate-500" />
                          )}
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-slate-900">
                            Module {lecture.order}: {lecture.lectureTitle}
                          </h3>

                          <p className="text-slate-500 mt-3">
                            {lecture.isPreviewFree
                              ? 'Sample session available for preview'
                              : 'Accessible after joining the academic program'}
                          </p>
                        </div>
                      </div>

                      <div className="text-sm text-slate-400 whitespace-nowrap">
                        {lecture.duration > 0
                          ? `${Math.floor(lecture.duration / 60)} mins`
                          : '--'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-8">
          {/* Admission */}
          <div className="bg-slate-950 text-white rounded-[2rem] p-8 sticky top-20 shadow-2xl">
            <p className="uppercase tracking-[0.3em] text-xs text-blue-300 font-semibold">
              Student Admission
            </p>

            <h2 className="text-5xl font-bold mt-6">
              {course.coursePrice > 0 ? `₹${course.coursePrice}` : 'Free'}
            </h2>

            <p className="text-slate-400 mt-3">One-time academic access</p>

            <button
              onClick={handleEnrollment}
              disabled={isCreatingOrder || isEnrolling}
              className="w-full mt-8 bg-white text-slate-950 py-4 rounded-2xl font-bold hover:scale-[1.02] transition disabled:opacity-60"
            >
              {isCreatingOrder || isEnrolling
                ? 'Enrolling...'
                : isEnrolled
                  ? 'Go To Learning'
                  : 'Join This Program'}
            </button>
          </div>

          {/* Trust */}
          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Why Students Choose This
            </h3>

            <div className="space-y-4">
              {(course.benefits?.length
                ? course.benefits
                : [
                    'Structured academic progression',
                    'Mentor-guided learning approach',
                    'Lifetime access to modules',
                    'Accessible across all devices',
                  ]
              ).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-slate-600"
                >
                  <CheckCircle2 className="text-green-500" size={18} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
