import ProductList from "@/components/ProductList";
import Image from "next/image";

const Homepage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;
  return (
    <div className="">
      {/* Explicitly set the width to full and gave it a fixed height */}
      <div className="relative w-full h-[400px] md:h-[600px] mb-12">
        <Image 
          src="/featured.png" 
          alt="Featured Product" 
          fill 
          className="object-cover" 
          priority
        />
      </div>
      <ProductList category={category} params="homepage"/>
    </div>
  );
};

export default Homepage;