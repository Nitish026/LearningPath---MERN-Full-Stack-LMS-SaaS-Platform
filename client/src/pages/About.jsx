import React from 'react';
import { BookOpen, GraduationCap, Target, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            About Learning Paths
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
            Structured Learning Built For Real Academic Success
          </h1>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Learning Paths is designed to help students master concepts, track
            progress, and prepare confidently for school exams, competitive
            exams, and future careers.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mt-16">
          {[
            { icon: Users, title: '1000+', desc: 'Students Guided' },
            { icon: BookOpen, title: '50+', desc: 'Structured Modules' },
            { icon: GraduationCap, title: '24/7', desc: 'Learning Access' },
            { icon: Target, title: 'Focused', desc: 'Exam Preparation' },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm"
              >
                <Icon
                  className="text-blue-600 dark:text-blue-400 mb-4"
                  size={28}
                />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mt-20">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-10 shadow-sm">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              To make high-quality academic learning structured, accessible, and
              progress-driven. Students should not feel lost while preparing for
              important exams. We provide clarity, guidance, and a roadmap to
              success.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-10 shadow-sm">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Why Students Choose Us
            </h2>
            <ul className="space-y-4 text-slate-600 dark:text-slate-400 text-lg">
              <li>✓ Structured chapter-wise learning</li>
              <li>✓ Progress tracking and completion system</li>
              <li>✓ Competitive exam focused preparation</li>
              <li>✓ Personalized academic guidance</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
