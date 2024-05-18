import Right from "@/components/icons/Right";
import Image from "next/image";

export default function Hero() {
    return(
      <section className="hero md:mt-4">
        <div className="py-8 md:py-12">
          <h1 className="text-4xl font-semibold">
            Everything<br/> 
            is nice <br/>
             with good&nbsp;
            <span className="text-primary">
             Food
            </span>

         </h1>
          <p className="my-6 text-gray-500 text-sm">Delicious and Quality Food always makes you feel happy and completes your day</p>
          <div className="flex gap-4 text-sm">
             <button className="justify-center bg-primary uppercase flex items-center gap-2 text-white px-3 py-2 rounded-full">
                Order now
                <Right/>
             </button>
             <button className="flex items-center border-0 gap-2 py-2 text-gray-500 font-semibold">
                Learn More
                <Right/>
             </button>
          </div>
        </div>
        <div className="relative hidden md:block">
          <Image src={'/biriyani.png'} layout={'fill'}  objectFit={'contain'} alt={'Biriyani'}/>
        </div>
      </section>
    );
}