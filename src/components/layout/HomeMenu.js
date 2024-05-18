'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/Menu/MenuItems"
import Image from "next/image";
import { useEffect,useState } from "react";

export default function HomeMenu () {
  const [bestSellers,setBestSellers] = useState([]);
  useEffect(()=>{
    fetch('/api/menu-items').then(res =>{
      res.json().then(menuItems =>{
        setBestSellers(menuItems.slice(-3));
      });
    });
  },[])
    return (
     <section className="">
        <div className="absolute left-0 right-0 w-full justify-start">
          {/* <div className="absolute left-0 -z-10">
            <Image src={'/tandoori.png'} width={'180'} height={'180'}  alt={'Tandoori'}/>
          </div>
          <div className="absolute right-0 -z-10">
          <Image src={'/tikka.webp'} width={'240'} height={'240'} alt={'Tikka'}/>
          </div> */}
        </div>
        <div className="text-center mb-4">
          <SectionHeaders 
            subHeader={'check out'} 
            mainHeader={'Best Sellers'}/>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
           {bestSellers?.length > 0 && bestSellers.map(item => (
            <MenuItem key={item._id} {...item}/>
           ))}
        </div>
     </section>
    );
}