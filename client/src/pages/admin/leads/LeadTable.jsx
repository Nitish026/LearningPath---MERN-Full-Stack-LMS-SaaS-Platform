import React from 'react';
import {
  useGetAllLeadsQuery,
  useUpdateLeadStatusMutation,
} from '@/features/api/leadApi';
import { toast } from 'sonner';

const LeadTable = () => {
  const { data, isLoading, isError } = useGetAllLeadsQuery();
  const [updateLeadStatus] = useUpdateLeadStatusMutation();

  const leads = data?.leads || [];

  const statusUpdateHandler = async (id, status) => {
    try {
      await updateLeadStatus({ id, status }).unwrap();
      toast.success('Lead updated successfully');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update lead');
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-xl text-slate-700 dark:text-slate-200">
        Loading leads...
      </div>
    );
  }

  if (isError) {
    return <div className="p-8 text-xl text-red-500">Failed to load leads</div>;
  }

  return (
    <div className="p-8 min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Lead Management
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Manage student inquiries and conversions
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left px-6 py-4">Name</th>
                <th className="text-left px-6 py-4">Email</th>
                <th className="text-left px-6 py-4">Phone</th>
                <th className="text-left px-6 py-4">Class</th>
                <th className="text-left px-6 py-4">Goal</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-left px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="border-t border-slate-200 dark:border-slate-800"
                >
                  <td className="px-6 py-5 text-slate-900 dark:text-white">
                    {lead.name}
                  </td>

                  <td className="px-6 py-5 text-slate-600 dark:text-slate-300">
                    {lead.email}
                  </td>

                  <td className="px-6 py-5 text-slate-600 dark:text-slate-300">
                    {lead.phone}
                  </td>

                  <td className="px-6 py-5 text-slate-600 dark:text-slate-300">
                    {lead.classLevel}
                  </td>

                  <td className="px-6 py-5 text-slate-600 dark:text-slate-300">
                    {lead.goal}
                  </td>

                  <td className="px-6 py-5">
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                      {lead.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        statusUpdateHandler(lead._id, e.target.value)
                      }
                      className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadTable;
