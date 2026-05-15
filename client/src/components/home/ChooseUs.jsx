import React from 'react';
import { GraduationCap, TrendingUp, Target, Sparkles } from 'lucide-react';

const features = [
  {
    icon: GraduationCap,
    title: 'Structured Learning Paths',
    description:
      'Follow clear chapter-wise academic roadmaps instead of random studying.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description:
      'Monitor your course completion and stay accountable throughout your journey.',
  },
  {
    icon: Target,
    title: 'Exam-Focused Preparation',
    description:
      'Learn with strategies built for boards, competitive exams, and real academic success.',
  },
  {
    icon: Sparkles,
    title: 'Personalized Guidance',
    description:
      'Get academic counseling and learning direction tailored to your goals.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-slate-100 dark:bg-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            Why Choose Learning Paths
          </span>

          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
            Built For Real Academic Growth
          </h2>

          <p className="mt-5 text-lg text-slate-600 dark:text-slate-400">
            More than just video lectures — a complete learning ecosystem for
            ambitious students.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center mb-6">
                  <Icon
                    className="text-blue-600 dark:text-blue-400"
                    size={26}
                  />
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
