import Image from "next/image";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Count from "./components/count";
import Faq from "./components/faq";
import Creators from "./components/weAreCreators";
import Navbar from "./components/header";
import Slideshow from "./components/heroImage";
export default function Home() {
  return (
    <>
    <div className="">
    <Navbar />
    <div className="">
      <Slideshow />
    </div>
    <div className="ml-4 mb-4 mt-4">
        <h1 className="text-white font-semibold text-2xl text-start ml-4 border-l-8 border-blue-700 pl-4">
        People&rsquo;s Associated
        </h1>
      </div>
      <Count />
      <div className="ml-4 mb-4 mt-4">
        <h1 className="text-white font-semibold text-2xl text-start ml-4 border-l-8 border-blue-700 pl-4">
          Meet the Creator
        </h1>
      </div>
      <Creators />
      <div className="ml-4 mt-5">
        <h1 className="text-white font-semibold text-2xl text-start ml-4 border-l-8 border-blue-700 pl-4">
          Contact Us
        </h1>
      </div>
      <Contact />
      <Faq />
      <Footer />
    </div>
      
    </>
  );
}
