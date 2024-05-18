"use client";
import { useState,useEffect } from "react";
import {useProfile} from "@/components/UseProfile";
import Link from "next/link";
import Left from "@/components/icons/Left"
import UserTabs from "@/components/layout/UserTabs"
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { redirect } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";
import DeleteButton from "@/components/DeleteButton";

export default function EditMenuItemPage(){

    const {id}= useParams();
    const [menuItem,setMenuItem]=useState(null);
    const [redirectToItem,setRedirectToItem]=useState(false);
    const {loading,data} = useProfile();

    useEffect(()=>{
        fetch('/api/menu-items').then(res=>{
            res.json().then(items=>{
              const item = items.find(i => i._id === id) ;
              setMenuItem(item);
          });
        })
    },[])
     async function handleFormSubmit(ev,data) {
        ev.preventDefault();
        data={...data,_id:id};
        const savingPromise = new Promise(async(resolve,reject)=>{
            const response = await fetch('/api/menu-items',{
                method:'PUT',
                body: JSON.stringify(data),
                headers: {'Content-Type':'application/json'},
            });
            if(response.ok)
                resolve();
            else
                reject();
        });

        await toast.promise(savingPromise, {
          loading: 'Saving this tasty item',
          success: 'Saved',
          error: 'Error'
        });
        
       setRedirectToItem(true);
     }

    async function handleDeleteClick()  {
        const promise =new Promise (async(resolve,reject)=>{
            const res = await fetch('/api/menu-items?_id='+id,{
             method:'DELETE',
            });
            if(res.ok) {
              resolve();
            } else {
               reject();
            }
       });
       await toast.promise(promise, {
         loading: 'Delete...',
         success:'Deleted',
         error: 'Error'
       });

       setRedirectToItem(true);
     }

     if(redirectToItem) {
        return redirect('/menu-items');
    }


    if(loading) {
        return 'Loading user info...';
    }

    if(!data.admin) {
        return 'Not an Admin.';
    }

    return (
        <section className="mt-8">
        <UserTabs isAdmin={true}/>
        <div className="max-w-2xl mx-auto mt-8">
             <Link href={'/menu-items'} className="button">
                <Left/>
                <span>Show All menu Items</span>
             </Link>
        </div>
       <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit}/>
       <div className="max-w-md mx-auto mt-2">
          <div className="mx-auto">
            <DeleteButton 
              label="Delete this Menu Item"
              onDelete={handleDeleteClick}
              />                
          </div>
       </div>
       </section>
    );
}