import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";

interface RecentReservation {
  id: string;
  checkIn: Date;
  checkOut: Date;
  room: {
    name: string;
    image: string;
  };
  user: {
    name: string | null;
    email: string;
  };
  Payment: {
    status: string;
    amount: number;
  }[];
}

interface RecentReservationsTableProps {
  reservations: RecentReservation[];
}

const RecentReservationsTable = ({ reservations }: RecentReservationsTableProps) => {
  return (
    <div className="bg-white rounded-sm shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Recent Reservations</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Guest
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Room
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Check In
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Check Out
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No reservations found
                </td>
              </tr>
            ) : (
              reservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        {reservation.user.name || "Guest"}
                      </span>
                      <span className="text-sm text-gray-500">
                        {reservation.user.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={reservation.room.image}
                          alt={reservation.room.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium text-gray-900">
                        {reservation.room.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {format(new Date(reservation.checkIn), "MMM dd, yyyy")}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {format(new Date(reservation.checkOut), "MMM dd, yyyy")}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {formatCurrency(reservation.Payment[0]?.amount || 0)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        reservation.Payment[0]?.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {reservation.Payment[0]?.status === "paid" ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentReservationsTable;
