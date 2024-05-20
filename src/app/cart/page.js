'use client';
import {CartContext} from "@/components/AppContext";
import { cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext, useEffect, useState } from "react";
// import CartProduct from "@/components/Menu/CartProduct"
import Trash from "@/components/icons"
import AddressInputs from "@/components/layout/AddressInputs";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";

export default function CartPage() {
   const {cartProducts, removeCartProducts} = useContext(CartContext); 
   const [address, setAddress] = useState({});
   const {data:profileData} = useProfile();
   
   useEffect(()=>{
      if(typeof window !== 'undefined') {
        if(window.location.href.includes('canceled=1')) {
          toast.error('Payment failed ');
        }
      }
   },[]);

   useEffect(()=>{
    if(profileData?.city) {
      const {phone,streetAddress, city, postalCode, country} = profileData
      const addressFromProfile =  {
        phone, 
        streetAddress, 
        city, 
        postalCode, 
        country};
      setAddress(addressFromProfile);
    }
   },[profileData])
   let subtotal = 0;
   for(const p of cartProducts) {
    subtotal += cartProductPrice(p);
   }
   function handleAddressChange(propName, value) {
     setAddress(prevAddress => ({...prevAddress, [propName]:value})
     );
   }
   async function proceedToCheckout(ev) {
    ev.preventDefault();

    const promise = new Promise((resolve,reject) => {
      fetch('/api/checkout',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
           address,
           cartProducts,
        }),
      }).then(async(response) => {

        if(response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: 'Preparing your order...',
      success: 'Redirecting to payment...',
      error: 'Something Went Wrong...Please Try Again Later',
    })
   }
   
   if(cartProducts?.length === 0) {
     return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your Shopping Cart is Empty</p>
      </section>
     ); 
   }

   return (
      <section className="mt-8">
        <div className="text-center">
           <SectionHeaders mainHeader="Cart"/>
        </div>
        <div className="mt-4 grid gap-8 grid-cols-2">
            <div>
               {cartProducts?.length === 0 && (
                 <div>No Products in Your Shopping Cart</div>
               )}
               {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                  <div className="flex items-center gap-4 border-b py-4">
                  <div classNmae="w-24">
                      <img width={240} height={240} src={product.image} alt={''} />
                  </div>
                  <div className="w-96">
                      <h3 className="font-semibold">
                          {product.name}
                      </h3>
                      {product.size && (
                          <div className="text-sm">
                              Size: <span>{product.size.name}</span>
                          </div>
                      )}
                      {product.extras?.length > 0 && (
                          <div className="text-sm text-gray-500">
                              {product.extras.map(extra => (
                                  <div key={extra.name} >{extra.name} Rs.{extra.price}</div>
                              ))}
                          </div>
                      )}
                  </div>
                  <div className="text-md font-semibold ">
                      Rs.{cartProductPrice(product)}
                  </div>
                      <div className="ml-2">
                      <button
                          type="button"
                          onClick={() => removeCartProducts(index)}
                          className="p-2">
                          <Trash />
                      </button>
                    </div>
              </div>
               ))}
               <div className="py-2 pr-16 flex justify-end items-center">
                <div className="text-gray-500">
                  Subtotal:<br/>
                  Delivery:<br/>
                  Total:
                </div>
                <div className="font-semibold pl-2 text-right">
                    Rs.{subtotal}<br/>
                    Rs.40<br/>
                    Rs.{subtotal+40}
                </div>
               </div>
            </div>
            <div className="bg-gray-100 p-4">
               <h2>Checkout</h2>  
               <form onSubmit={proceedToCheckout}>
                  <AddressInputs 
                     addressProps={address}
                     setAddressProp={handleAddressChange}
                  />
                  <button type="submit"> Pay Rs.{subtotal+40}</button>
               </form>
            </div>
        </div>
      </section>
   );
}