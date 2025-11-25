import { getDashboardStats, getRecentReservations } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import StatCard from "@/components/dashboard/StatCard";
import RecentReservationsTable from "@/components/dashboard/RecentReservationsTable";
import { FaBed, FaCalendarCheck, FaDollarSign, FaClock } from "react-icons/fa";

const DashboardPage = async () => {
  const stats = await getDashboardStats();
  const recentReservations = await getRecentReservations(10);

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Overview of your hotel management system
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Rooms"
            value={stats.totalRooms}
            icon={<FaBed className="text-white text-2xl" />}
            bgColor="bg-white"
            iconBgColor="bg-orange-400"
          />
          <StatCard
            title="Total Reservations"
            value={stats.totalReservations}
            icon={<FaCalendarCheck className="text-white text-2xl" />}
            bgColor="bg-white"
            iconBgColor="bg-blue-400"
          />
          <StatCard
            title="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            icon={<FaDollarSign className="text-white text-2xl" />}
            bgColor="bg-white"
            iconBgColor="bg-green-400"
          />
          <StatCard
            title="Pending Payments"
            value={stats.pendingPayments}
            icon={<FaClock className="text-white text-2xl" />}
            bgColor="bg-white"
            iconBgColor="bg-yellow-400"
          />
        </div>

        <RecentReservationsTable reservations={recentReservations || []} />
      </div>
    </div>
  );
};

export default DashboardPage;
