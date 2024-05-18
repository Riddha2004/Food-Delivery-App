"use client";
import { useSession } from "next-auth/react";
import { useState,useEffect } from "react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import UserForms from "@/components/layout/UserForm";

export default function ProfilePage() {
    const session = useSession();
    console.log({session});
    const [user,setUser] = useState(null);
    const [isAdmin,setIsAdmin]=useState(false);
    const [profileFetched, setProfileFetched]=useState(false);
    const {status}=session;
    
    useEffect(()=>{
      if (status ==='authenticated') {
         fetch('/api/profile').then(response=>{
          response.json().then(data=>{
            setUser(data);
            setIsAdmin(data.admin);
            setProfileFetched(true);
          })
         });

      }
    },[session,status]);
    async function handleProfileInfoUpdate(ev,data) {
       ev.preventDefault();
       const savingPromise = new Promise(async (resolve,reject)=>{
         const response = await fetch('/api/profile',{
          method:'PUT',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(data),
        });
        if(response.ok)
          resolve();
        else
          reject();
       });
       await toast.promise(savingPromise, {
          loading:'Saving...',
          success:'Profile Saved!',
          error:'Error',
       });
    }
    async function handleFileChange(ev) {
      const files = ev.target.files;
      if(files?.length === 1) {
        const data = new FormData;
        data.set('files',files[0]);
        await fetch('/api/upload', {
          method:'POST',
          body: data,

        });
      }
    }
    if(status === 'loading' || !profileFetched) {
        return 'Loading...'
    }

    if(status === 'unauthenticated') {
        return redirect('/login');
    }
    const useImage = session.data.user.image; 
    return (
       <section className="mt-8">
          <UserTabs isAdmin={isAdmin}/>
          <div className="max-w-2xl mx-auto mt-8">
           <UserForms user={user} onSave={handleProfileInfoUpdate}/>
          </div>
       </section>
    );
}