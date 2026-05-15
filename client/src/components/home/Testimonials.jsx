import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Aarav Sharma',
    role: 'Class 12 Student',
    review:
      'The structured learning path helped me stay consistent. Progress tracking made a huge difference in my preparation.',
  },
  {
    name: 'Priya Verma',
    role: 'CUET Aspirant',
    review:
      'The academic guidance was extremely helpful. I finally had clarity about what to study and how to plan.',
  },
  {
    name: 'Rohan Mehta',
    role: 'Mathematics Learner',
    review:
      'This feels much more organized than random YouTube learning. The platform keeps me focused.',
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white dark:bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            Student Success Stories
          </span>

          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
            What Learners Say
          </h2>

          <p className="mt-5 text-lg text-slate-600 dark:text-slate-400">
            Real academic confidence comes from structured learning and clarity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-slate-50 dark:bg-slate-950 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition"
            >
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                "{item.review}"
              </p>

              <div className="mt-6">
                <h4 className="font-bold text-slate-900 dark:text-white">
                  {item.name}
                </h4>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
