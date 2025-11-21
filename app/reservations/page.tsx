import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import HeaderSection from "@/components/HeaderSection";

interface ReservationWithDetails {
  id: string;
  checkIn: Date;
  checkOut: Date;
  price: number;
  createdAt: Date;
  room: {
    name: string;
    image: string;
  };
  Payment: Array<{
    status: string;
  }>;
}

const ReservationsPage = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/signin");
  }

  const reservations = (await prisma.reservation.findMany({
    where: { userId: session.user.id },
    include: {
      room: {
        select: {
          name: true,
          image: true,
        },
      },
      Payment: {
        select: {
          status: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })) as ReservationWithDetails[];

  return (
    <div>
      <HeaderSection
        title="My Reservations"
        subTitle="Lorem ipsum dolor sit amet."
      />
      <div className="max-w-screen-xl py-20 px-4 mx-auto">
        {reservations.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-4V7m8 10l-8 4m0 0l-8-4M12 7v10m8 0v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4"
                />
              </svg>
            </div>
            <p className="text-2xl font-medium text-gray-500 mb-2">
              No reservations yet
            </p>
            <p className="text-lg text-gray-400">
              Book a room to see your reservations here.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-3">
            {reservations.map((reservation) => {
              const checkInDate = new Date(reservation.checkIn);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const isExpired = checkInDate < today;
              const paymentStatus = reservation.Payment[0]?.status;

              return (
                <div
                  key={reservation.id}
                  className="bg-white shadow-lg rounded-sm transition duration-100 hover:shadow-sm"
                >
                  <div className="h-[260px] w-auto rounded-t-sm relative">
                    {reservation.room.image && (
                      <Image
                        src={reservation.room.image}
                        alt={reservation.room.name}
                        fill
                        className="w-full h-full object-cover rounded-t-sm"
                      />
                    )}
                  </div>
                  <div className="p-8">
                    <h4 className="text-2xl font-medium mb-7">
                      <Link
                        href={`/checkout/${reservation.id}`}
                        className="hover:text-gray-800 transition duration-150"
                      >
                        {reservation.room.name}
                      </Link>
                    </h4>
                    <h4 className="text-2xl mb-7">
                      <span className="font-semibold text-gray-600">
                        {formatCurrency(reservation.price)}
                      </span>
                      <span className="text-gray-400 text-sm">Total</span>
                    </h4>
                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      <p>
                        <span className="font-semibold text-gray-900">
                          Check-in:
                        </span>{" "}
                        {reservation.checkIn.toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-900">
                          Check-out:
                        </span>{" "}
                        {reservation.checkOut.toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          isExpired && paymentStatus !== "paid"
                            ? "bg-gray-100 text-gray-800"
                            : paymentStatus === "paid"
                            ? "bg-green-100 text-green-800"
                            : paymentStatus === "failure"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {isExpired && paymentStatus !== "paid"
                          ? "EXPIRED"
                          : paymentStatus?.toUpperCase() || "UNPAID"}
                      </span>
                      <Link
                        href={`/checkout/${reservation.id}`}
                        className="px-6 py-2.5 md:px-10 md:py-3 font-semibold text-white bg-orange-400 rounded-sm hover:bg-orange-500 transition duration-150"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationsPage;
