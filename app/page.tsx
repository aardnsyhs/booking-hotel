import Hero from "@/components/Hero";
import Main from "@/components/Main";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="mt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold uppercase">Room & Rates</h1>
          <p className="py-3">
            Choose from our selection of comfortable rooms designed for your
            perfect stay.
          </p>
        </div>
        <Main />
      </div>
    </div>
  );
}
