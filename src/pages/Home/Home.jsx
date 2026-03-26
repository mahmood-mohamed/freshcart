import ShowProducts from './../../components/ShowProducts/ShowProducts';
import HeroSection from '../../components/HeroSection/HeroSection';
import SubCategorySection from '../../components/SubCategorySection/SubCategorySection';
import BrandSlider from '../../components/BrandSlider/BrandSlider';


export default function Home() {

  return (
    <>
      <HeroSection />
      <SubCategorySection />
      <BrandSlider />
      <section className="container py-12">
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
              Featured <span className="text-green-600"> Products</span>
            </h2>
            <p className="text-gray-500 mt-2 text-center">Handpicked selection of our best items</p>
        </div>
        <ShowProducts/>
      </section>
    </>
  );
}

