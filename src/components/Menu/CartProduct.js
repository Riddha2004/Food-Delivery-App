import {cartProductPrice} from "@/components/AppContext";
import Trash from "@/components/icons/Trash";

export default function CartProduct({key,product,onRemove}) {
    return (
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
            {!!onRemove && (
                <div className="ml-2">
                <button
                    type="button"
                    onClick={() => onRemove(key)}
                    className="p-2">
                    <Trash />
                </button>
              </div>
            )}
        </div>
    );
}