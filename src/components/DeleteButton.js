import { useState } from "react";

export default function DeleteButton({label,onDelete}) {
   const [showConfirm, setshowConfirm] = useState(false);

   if(showConfirm) {
     return (
        <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center">
           <div className=" bg-white p-4 rounded-lg">
           <div>Are You Sure you want to delete?</div>
           <div className="flex gap-2 mt-1">
           <button type="button" onClick={()=> setshowConfirm(false)}>
            Cancel
            </button>
            <button 
              onClick={()=> {
                onDelete(); 
                setshowConfirm(false);
             }}
              type="button" 
              className="primary">
              Yes,&nbsp;Delete!
            </button>
           </div>
          </div>
        </div>
     );
   }

    return (
     <button type="button" onClick={() => setshowConfirm(true)}>
        {label}
     </button>
   );
}