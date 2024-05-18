import { useEffect, useState } from "react";
import Trash from "@/components/icons/Trash";
import Plus from "@/components/icons/Plus";
import MenuItemPriceProps from "@/components/layout/menuItemsPriceProps";

export default function MenuItemForm({onSubmit,menuItem}) {
    const [name,setName]=useState(menuItem?.name || '');
    const [image,setImage]=useState(menuItem?.image || '')
    const [description,setDescription] = useState(menuItem?.description || '');
    const [basePrice,setBasePrice] = useState(menuItem?.basePrice || ''); 
    const [sizes,setSizes] = useState(menuItem?.sizes || []);
    const [category, setCategory] = useState(menuItem?.category || '');
    const [categories,setCategories] = useState([]);
    const [
      extraIngredientPrices,
      setExtraIngredientPrices,
   ] = useState(menuItem?.extraIngredientPrices || []);
   
   useEffect(()=>{
      fetch('/api/categories').then(res => {
         res.json().then(categories => {
           setCategories(categories);
         });
      });
   },[]);
    
    
    return (
        <form  
              onSubmit={ev => 
               onSubmit(ev,{
                  name,image,description,basePrice,sizes,extraIngredientPrices,category,
               })
            } 
               className="mt-8 max-w-2xl mx-auto">
        <div className="md:grid items-start gap-4">
            <div className="grow">
                <label>Item name</label>
                <input 
                   type="text"
                   value={name} 
                   onChange={ev => setName(ev.target.value)}/>
                <label>Description</label>
                <input 
                   type="text"
                   value={description} 
                   onChange={ev => setDescription(ev.target.value)}/>
                <label>Category</label>
                <select value={category} onChange={ev => setCategory(ev.target.value)}>
                  {categories?.length > 0 && categories.map(c => (
                     <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
                <label>Base Price</label>
                <input 
                   type="text"
                   value={basePrice} 
                   onChange={ev => setBasePrice(ev.target.value)}
                />
                <label>Image Link</label>
                <input 
                  type="text"
                  value={image}
                  onChange={ev=> setImage(ev.target.value)}
                />
                <MenuItemPriceProps name={'Sizes'}
                                    addLabel={'Add Item Size'} 
                                    props={sizes} 
                                    setProps={setSizes}/>
                <MenuItemPriceProps name={'Extra ingredients'} 
                                    addLabel={'Add Ingedients Prices'}
                                    props={extraIngredientPrices}
                                    setProps={setExtraIngredientPrices}
                />
                <button type="submit">Save</button>
            </div>
        </div>
      </form>
    );
}