'use client';
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import Link from "next/link";
import Right from "@/components/icons/Right";
import { useState,useEffect } from "react";

export default function MenuItemsPage() {

    const [menuItems, setMenuItems] = useState([]);
    const {loading,data}=useProfile();
    
    useEffect(()=>{
      fetch('/api/menu-items').then(res=>{
        res.json().then(menuItems=> {
        setMenuItems(menuItems);
        });
      })
    },[]);

    if(loading) {
        return 'Loading user info...'
    }
    
    if(!data.admin) {
        return 'Not an Admin.'
    }

    return (
     <section className="mt-8 max-w-2xl mx-auto">
        <UserTabs isAdmin={true}/>
        <div className="mt-8">
          <Link
           className="button"
           href={'/menu-items/new'}
          >
            Create new Menu Items
            <Right/>
          </Link>
        </div>
        <div>
            <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
            <div className="grid grid-cols-3 gap-2">
             {menuItems?.length > 0 && menuItems.map(item=>(
                <Link 
                  key={item._id}
                  href={'/menu-items/edit/'+item._id} 
                  className="bg-gray-200 rounded-lg p-4">
                  <div className="flex items-center rounded-md pl-8 py-4">
                      <img src={item.image} alt={''} width={'120'} height={'120'}/>
                  </div>
                  <div className="text-center">
                    {item.name}
                  </div>
                </Link>
             ))}
            </div>
        </div>
     </section>
    );
}