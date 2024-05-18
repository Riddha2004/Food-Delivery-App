"use client";
import Image from "next/image";
import { useState } from "react";
import {useProfile} from "@/components/UseProfile";
import AddressInputs from "@/components/layout/AddressInputs";


export default function UserForm({user,onSave}) {
    const [userName,setUserName]=useState(user?.name || '');
    const [phone,setPhone] = useState(user?.phone || '');
    const [streetAddress,setStreetAddress] = useState(user?.streetAddress || '');
    const [postalCode,setPostalCode]=useState(user?.postalCode|| '');
    const [city,setCity]=useState(user?.city || '');
    const [country,setCountry]=useState(user?.country || '');
    const [admin,setAdmin] = useState(user?.admin || false);
    const {data:loggedInUserData} = useProfile();

    function handleAddressChange(propName, value) {
      if(propName === 'phone') setPhone(value);
      if(propName === 'streetAddress') setStreetAddress(value);
      if(propName === 'postalCode') setPostalCode(value);
      if(propName === 'city') setCity(value);
      if(propName === 'country') setCountry(value);

    }
    return (
        <div className="md:flex gap-4">
        <div>
            <div className="p-2 rounded-lg relative">
               <Image className="rounded-lg w-36 h-full mb-1" src={user.image} width={250} height={250} alt={'avatar'}/>
               <label>
                  {/* <input type="file" className="hidden" onChange={handleFileChange}/> */}
                   <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer w-36">Edit</span>
               </label>
            </div>
        </div>
        <form 
          className="grow" 
          onSubmit={ev => 
            onSave(ev, {
                name:userName,phone,streetAddress,admin,
                postalCode,city,country})
         }
        >
            <label>
              First and Last Name
            </label>
            <input 
             type="text" placeholder="First and Last Name"
             value={userName} onChange={ev => setUserName(ev.target.value)}/>
            <label>Email</label>
            <input 
              type="email" 
              disabled={true} 
              value={user.email} 
              placeholder={'email'}
            />
             <AddressInputs 
              addressProps={{phone,streetAddress,postalCode,city,country}}
              setAddressProp={handleAddressChange}
            />
            {loggedInUserData.admin && (
                 <div>
                 <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor="adminCb">
                   <input 
                     id="adminCb" type="checkbox" className="" value={'1'}
                     checked={admin}
                     onChange={ev=>setAdmin(ev.target.checked)}
                   />
                   <span>Admin</span>
                 </label>
               </div>
            )}
            <button type="submit">Save</button>
        </form>
    </div>
    );
}