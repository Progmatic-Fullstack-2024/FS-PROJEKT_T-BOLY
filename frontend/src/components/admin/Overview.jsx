import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import OverviewCards from './OverviewCards.jsx';
import OverviewCharts from './OverviewCharts.jsx';
import statisticsService from '../../services/statisticsService.js';

export default function Overview() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await statisticsService.getStatistics();
        setStats(data);
      } catch (error) {
        toast.error('Failed to fetch statistics');
      }
    };

    fetchStatistics();
  }, []);

  return (
    <section className="py-8 px-6 bg-gradient-to-br from-orange-200 via-orange-100 to-orange-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">📊 Admin Overview</h2>
      {stats ? (
        <>
          <OverviewCards stats={stats} />
          <OverviewCharts stats={stats} />
        </>
      ) : (
        <p className="text-center text-lg text-gray-600">Loading statistics...</p>
      )}
    </section>
  );
}
