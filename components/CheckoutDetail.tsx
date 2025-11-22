import { getReservationById } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import Image from "next/image";
import PaymentButton from "./PaymentButton";
import CancelBookingButton from "./CancelBookingButton";
import { getCancellationPolicy } from "@/lib/cancellation-policy";

const CheckoutDetail = async ({ reservationId }: { reservationId: string }) => {
  const reservation = await getReservationById(reservationId);
  if (!reservation) {
    return <h1>No Reservation Found.</h1>;
  }
  const duration = differenceInCalendarDays(
    reservation.checkOut,
    reservation.checkIn
  );
  if (!reservation || !reservation.Payment) {
    return <h1>No Reservation Found.</h1>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="order-2">
        <div className="flex flex-col mb-3 items-start bg-white border border-gray-200 rounded-sm md:flex-row md:w-full">
          <div className="aspect-video relative">
            <Image
              src={reservation.Room.image}
              alt={reservation.Room.name}
              width={500}
              height={300}
              className="object-cover w-full rounded-t-sm aspect-video md:rounded-none md:rounded-s-sm"
            />
          </div>
          <div className="flex flex-col justify-between p-4 leading-normal w-full">
            <h5 className="mb-1 text-4xl font-bold tracking-tight text-gray-900">
              {reservation.Room.name}
            </h5>
            <div className="flex items-center gap-1 text-2xl text-gray-500">
              <div className="flex items-center justify-center gap-1">
                <span className="text-2xl">
                  {formatCurrency(reservation.price)}
                </span>
                <span>/ night</span>
              </div>
            </div>
          </div>
        </div>
        {reservation.status !== "cancelled" && (
          <PaymentButton reservation={reservation} />
        )}
        {reservation.status !== "cancelled" &&
          reservation.Payment?.status === "paid" && (
            <>
              {(() => {
                const policy = getCancellationPolicy(reservation.checkIn);
                return (
                  <CancelBookingButton
                    reservationId={reservation.id}
                    checkInDate={reservation.checkIn}
                    totalAmount={reservation.Payment.amount}
                    canCancel={policy.canCancel}
                    cancelReason={policy.reason}
                  />
                );
              })()}
            </>
          )}
        {reservation.status === "cancelled" && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-sm">
            <h3 className="font-semibold text-red-800 mb-2">
              Booking Cancelled
            </h3>
            <p className="text-sm text-red-700 mb-2">
              <strong>Reason:</strong> {reservation.cancellationReason}
            </p>
            <p className="text-sm text-red-700 mb-2">
              <strong>Refund Amount:</strong>{" "}
              {formatCurrency(reservation.refundAmount || 0)}
            </p>
            <p className="text-sm text-red-700">
              <strong>Refund Status:</strong>{" "}
              <span className="uppercase">{reservation.refundStatus}</span>
            </p>
          </div>
        )}
      </div>
      <div className="border border-gray-200 px-3 py-5 bg-white rounded-sm">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="py-2">Reservation ID</td>
              <td className="py-2 text-right truncate">#{reservation.id}</td>
            </tr>
            <tr>
              <td className="py-2">Name</td>
              <td className="py-2 text-right truncate">
                {reservation.User.name}
              </td>
            </tr>
            <tr>
              <td className="py-2">Email</td>
              <td className="py-2 text-right truncate">
                {reservation.User.email}
              </td>
            </tr>
            <tr>
              <td className="py-2">Phone</td>
              <td className="py-2 text-right truncate">
                {reservation.User.phone}
              </td>
            </tr>
            <tr>
              <td className="py-2">Arrival</td>
              <td className="py-2 text-right truncate">
                {formatDate(reservation.checkIn.toISOString())}
              </td>
            </tr>
            <tr>
              <td className="py-2">Departure</td>
              <td className="py-2 text-right truncate">
                {formatDate(reservation.checkOut.toISOString())}
              </td>
            </tr>
            <tr>
              <td className="py-2">Duration</td>
              <td className="py-2 text-right truncate">
                <span>
                  {duration} {duration < 1 ? "Night" : "Nights"}
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-2">Amount in Rupiah</td>
              <td className="py-2 text-right truncate">
                <span>{formatCurrency(reservation.Payment?.amount || 0)}</span>
              </td>
            </tr>
            <tr>
              <td className="py-2">Status</td>
              <td className="py-2 text-right truncate">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    reservation.Payment?.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : reservation.Payment?.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : reservation.Payment?.status === "failure"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {reservation.Payment?.status?.toUpperCase() || "UNPAID"}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckoutDetail;
