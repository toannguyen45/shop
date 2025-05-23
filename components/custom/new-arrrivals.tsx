import { ArrowRight } from "lucide-react";
import Link from "next/link";

// components/custom/NewArrivals.tsx
const NewArrivals = () => {
  return (
    <section className="container mx-auto px-6 py-16 bg-gray-50">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light">NEW ARRIVALS</h2>
        <Link
          href="/new-arrivals"
          className="flex items-center space-x-2 hover:text-gray-600"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      {/* Similar grid layout as ReadyToWear but with newest products */}
    </section>
  );
};

export default NewArrivals;
