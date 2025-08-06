import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { formatDate } from '../utils/formatDate';
import { Link } from 'react-router-dom';

interface Job {
    id: number;
    title: string;
    company_name: string;
    location: string;
    description: string;
    salary: number;
    created_at: string;
    status: string;
    updated_at: string;  
}

interface JobApplication {
  id: number;
  job: Job;
  resume: string;
  cover_letter: string;
  status: string;
  created_at: string;
}

const JobApplication: React.FC = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        //const token = localStorage.getItem('token'); // Ensure you send this in headers in your api.ts
        const response = await api.get<JobApplication[]>('applications/');

        setApplications(response.data);
        //console.log('Applications fetched successfully:', response.data);
      } catch {
        setError('Something went wrong');
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Your Job Applications</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="overflow-x-auto">
            {applications.length === 0 ? (
                <>
                <p className="text-gray-500">No applications found.</p>
                <Link to="/applicantdashboard" className='bg-green-600 text-white py-2 px-4'>
                    See Jobs
                </Link>
                </>
                ) : (
          <table className="min-w-full table-auto border border-gray-50">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                <th className="px-4 py-3 border">#</th>
                <th className="px-4 py-3 border">Position</th>
                <th className="px-4 py-3 border">Company</th>
                <th className="px-4 py-3 border">Salary(Ksh)</th>
                <th className="px-4 py-3 border">Date Posted</th>
                <th className="px-4 py-3 border">Application Status</th>
                <th className="px-4 py-3 border">Job Status</th>
                <th className="px-4 py-3 border">Date Applied</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border">{index + 1}</td>
                  <td className="px-4 py-3 border">{app.job.title}</td>
                  <td className="px-4 py-3 border">{app.job.company_name}</td>
                  <td className="px-4 py-3 border">{app.job.salary}</td>
                  <td className="px-4 py-3 border">{formatDate(app.job.created_at)}</td>
                  <td
                    className={`px-4 py-3 border font-medium ${
                      app.status === 'Shortlisted' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
                    }`}
                  >
                    {app.status}
                  </td>
                  <td 
                    className={`px-4 py-3 border font-medium ${
                      app.job.status === 'active' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
                    }`}
                    >
                    {app.job.status}
                  </td>
                  <td className="px-4 py-3 border">{formatDate(app.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
            )}
        </div>
      </div>
    </div>
  );
};

export default JobApplication;
