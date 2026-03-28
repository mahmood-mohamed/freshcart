import ShowProducts from '../../components/ShowProducts/ShowProducts';

const productsBanner = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80";

export default function Products() {
  return (
    <section className="pb-6">
      {/* Banner */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden shadow-lg">
        <img 
          src={productsBanner} 
          alt="Products Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-center text-4xl md:text-5xl font-bold text-white tracking-widest uppercase">
            Product Collection
          </h1>
        </div>
      </div>

      {/* Product List */}
      <div className="container">
        <ShowProducts />
      </div>
    </section>
  )
}
