import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold">Welcome to Genki Ramune!</h1>
      <p className="text-gray-600 mt-2">Refreshing drinks for every moment.</p>

      <div>
        <ProductList />
      </div>
    </>
  );
}
