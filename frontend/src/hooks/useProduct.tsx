import { useState } from "react";
import { endpoint, Product_ } from "../App";

const useProduct = (product: Product_) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const addProduct = () => {
    return new Promise((resolve) => {
      console.log("quantity 2", quantity);
      setLoading(true);
      fetch(`${endpoint}/cart/${product.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ quantity }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            setMessage("Trop de quantité");
          } else {
            setMessage("Enregistré dans le panier");
          }
          setLoading(false);
          resolve(true);
        });
    });
  };

  return {
    quantity,
    message,
    loading,
    setQuantity,
    addProduct,
  };
};

export default useProduct;
