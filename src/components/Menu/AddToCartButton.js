export default function AddToCartButton({
    hasSizesorExtras, onClick, basePrice,
}) {
    return (
        <button 
         type="button"
          onClick={onClick}
          className="mt-4 bg-primary text-white rounded-full px-8 py-2">
            {hasSizesorExtras ? (
                <span>Add To Cart(From Rs.{basePrice})</span>
            ):(
                <span>Add to Cart Rs.{basePrice}</span>
            )}
        </button>
    );
}