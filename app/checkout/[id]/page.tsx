import CheckoutDetail from "@/components/CheckoutDetail";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reservation Summary",
};

const CheckoutPage = async ({ params }: { params: { id: string } }) => {
  const reservationId = params.id;

  return (
    <div className="max-w-screen-xl px-4 mx-auto py-20 mt-12">
      <h1 className="text-2xl font-semibold mb-8">Reservation Summary</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <CheckoutDetail reservationId={reservationId} />
      </Suspense>
    </div>
  );
};

export default CheckoutPage;
