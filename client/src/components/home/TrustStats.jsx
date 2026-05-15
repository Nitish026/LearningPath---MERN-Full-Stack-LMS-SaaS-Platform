import React from 'react';
import { Users, BookOpen, Clock3, BadgeCheck } from 'lucide-react';

const stats = [
  {
    icon: Users,
    title: '1000+',
    subtitle: 'Students Guided',
  },
  {
    icon: BookOpen,
    title: '50+',
    subtitle: 'Structured Modules',
  },
  {
    icon: Clock3,
    title: '24/7',
    subtitle: 'Learning Access',
  },
  {
    icon: BadgeCheck,
    title: 'Expert',
    subtitle: 'Academic Support',
  },
];

const TrustStats = () => {
  return (
    <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-slate-50 dark:bg-slate-950 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <Icon
                className="text-blue-600 dark:text-blue-400 mb-4"
                size={28}
              />

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {item.title}
              </h3>

              <p className="text-slate-500 dark:text-slate-400 mt-2">
                {item.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrustStats;
