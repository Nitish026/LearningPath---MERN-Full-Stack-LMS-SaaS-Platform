import React from 'react';

const faqs = [
  {
    question: 'Is academic counseling really free?',
    answer:
      'Yes. You can submit an inquiry and receive personalized academic guidance without any upfront payment.',
  },
  {
    question: 'Can I learn at my own pace?',
    answer:
      'Absolutely. Our structured learning system allows students to progress according to their own schedule.',
  },
  {
    question: 'Is this useful for competitive exam preparation?',
    answer:
      'Yes. The platform is designed for school academics as well as competitive exam-focused preparation.',
  },
  {
    question: 'How do I start learning?',
    answer:
      'Browse courses, enroll in a program, and begin your structured academic journey immediately.',
  },
];

const FAQ = () => {
  return (
    <section className="bg-slate-100 dark:bg-slate-950 py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            Frequently Asked Questions
          </span>

          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
            Questions Students Often Ask
          </h2>

          <p className="mt-5 text-lg text-slate-600 dark:text-slate-400">
            Everything you need to know before getting started.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {faq.question}
              </h3>

              <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
