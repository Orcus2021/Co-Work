import { createContext, useState } from "react";

export const SaleContext = createContext({
  products: [],
  addProduct: () => {},
  removeProduct: () => {},
});

const SaleProvider = (props) => {
  const [products, setProducts] = useState([]);
  const addProductHandler = (sale) => {
    setProducts(sale);
  };
  const removeProductHandler = (id) => {
    const newArr = products.filter((data) => data.id != id);
    setProducts(newArr);
  };

  const initSale = {
    products: products,
    addProduct: addProductHandler,
    removeProduct: removeProductHandler,
  };

  return (
    <SaleContext.Provider value={initSale}>
      {props.children}
    </SaleContext.Provider>
  );
};
export default SaleProvider;
