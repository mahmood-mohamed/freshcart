import AllCategories from "../../components/AllCategories/AllCategories";
import MainSlider from "../../components/MainSlider/MainSlider";
import useFetch from "../../hooks/useFetch";

export default function Categories() {
  const { data, error, isLoading } = useFetch("categories");

  return (
    <div className="overflow-x-hidden">

      <section className="relative bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 text-white overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative z-10 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white/90 rounded-full text-sm font-semibold tracking-widest uppercase mb-5 animate-fade-in-down">
            <i className="fas fa-th-large text-green-200" />
            Browse Categories
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight animate-fade-in-down delay-200">
            Shop by <span className="text-green-200">Category</span>
          </h1>
          <p className="text-white/75 text-lg mt-4 max-w-xl mx-auto leading-relaxed animate-fade-in delay-500">
            Discover our wide selection of product categories — from fresh
            produce to premium essentials, all in one place.
          </p>

          <div className="flex flex-wrap justify-center gap-8 mt-10 animate-fade-in delay-500">
            {[
              { icon: "fas fa-th-large",  text: `${data?.length ?? "—"}+ Categories` },
              { icon: "fas fa-shield-alt", text: "Quality Assured" },
              { icon: "fas fa-truck",      text: "Fast Delivery" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-white/80 text-sm font-medium">
                <i className={`${s.icon} text-green-200`} />
                {s.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 min-h-screen" aria-label="Main Categories">
        <div className="container mx-auto px-4">

          <MainSlider data={data} />

          <div className="flex items-center gap-3 my-10">
            <div className="flex-1 h-px bg-emerald-100" />
            <h2 className="text-xl font-extrabold text-gray-700 tracking-tight">
              All Categories
            </h2>
            <div className="flex-1 h-px bg-emerald-100" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <AllCategories
              data={data}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
