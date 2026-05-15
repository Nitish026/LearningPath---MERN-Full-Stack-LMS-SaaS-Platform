import React from 'react';
import { useGetAllPaymentsQuery } from '@/features/api/paymentApi';

const Payments = () => {
  const { data, isLoading } = useGetAllPaymentsQuery();

  const payments = data?.payments || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">
          Loading payments...
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Payments
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Track all course purchases and payment activity.
        </p>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <th className="text-left px-6 py-4">Student</th>
              <th className="text-left px-6 py-4">Email</th>
              <th className="text-left px-6 py-4">Course</th>
              <th className="text-left px-6 py-4">Amount</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment._id}
                className="border-b border-slate-100 dark:border-slate-800"
              >
                <td className="px-6 py-4 text-slate-900 dark:text-white">
                  {payment.user?.name}
                </td>

                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                  {payment.user?.email}
                </td>

                <td className="px-6 py-4 text-slate-900 dark:text-white">
                  {payment.course?.courseTitle}
                </td>

                <td className="px-6 py-4 text-slate-900 dark:text-white">
                  ₹{payment.amount}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      payment.status === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : payment.status === 'failed'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
