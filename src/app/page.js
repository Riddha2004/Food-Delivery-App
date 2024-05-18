import SectionHeaders from "@/components/layout/SectionHeaders";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16 " id="about">
        <SectionHeaders
          subHeader={'Our Story'}
          mainHeader={'About Us'}
        />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae est temporibus dignissimos velit laborum earum nesciunt. Odio ex nihil magnam perferendis, distinctio quod perspiciatis veritatis cumque voluptas eum. Officiis, dolores!
          </p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis obcaecati quisquam ipsum dicta rerum esse dolores corporis possimus quaerat consequatur tempore ducimus, officiis harum similique nemo quis omnis ad recusandae.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders 
          subHeader={'Don\'t hesitate'}
          mainHeader={'Contact Us'}
        />
       <div className="mt-8"> 
          <a className="text-4xl underline text-gray-500"href="tel:+919088441474">
            +91 90884 41474
          </a>
       </div>
      </section>
    </>
  );
}
