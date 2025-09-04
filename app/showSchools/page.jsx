// app/showSchools/page.jsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Building2, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get('/api/schools/list');
        setSchools(response.data);
      } catch (err) {
        setError('Failed to fetch schools.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchools();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading schools...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (schools.length === 0) return <div className="text-center mt-8">No schools found. Add some!</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">List of Schools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {schools.map((school, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
            <div className="relative w-full h-48">
              <Image
                src={school.image}
                alt={school.name}
                fill // Replaced 'layout="fill"' with this
                className="object-cover object-center" // 'objectFit' is now a CSS class
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 truncate flex items-center">
                <Building2 className="mr-2" />
                {school.name}
              </h2>
              <p className="mt-2 text-gray-600 flex items-center">
                <MapPin className="mr-2" size={16} />
                {school.address}, {school.city}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}