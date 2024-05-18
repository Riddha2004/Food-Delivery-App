import AddToCartButton from "@/components/menu/AddToCartButton";

export default function MenuItemTile({onAddToCart,...item}) {
    const {image, description, name, basePrice, 
        sizes, extraIngredientPrices}=item; 
        const hasSizesorExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0;
    return (
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
        <div className="text-center ">
          <img src={image} className="max-h-auto max-h-48 block mx-auto" alt="Chicken Biriyani" />
        </div>
        <h4 className="font-semibold text-xl my-3">{name}</h4>
        <p className="text-gray-500 text-sm max-h-16 line-clamp-3">{description} </p>
        <AddToCartButton 
           hasSizesorExtras={hasSizesorExtras}
           onClick={onAddToCart}
           basePrice={basePrice}
        />
      </div>
    );
}