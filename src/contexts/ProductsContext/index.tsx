import { useState, ReactNode, useEffect } from 'react';
import { createContext } from 'use-context-selector';

import { ProductI } from '../../@types/api/ProductsList';
import * as rest from '../../services/ProductsService';
import { ProductsContextData } from './types';

export const ProductsContext = createContext({} as ProductsContextData);

type ProductsProviderProps = {
  children: ReactNode;
};

export function ProductsProvider({
  children,
}: ProductsProviderProps): JSX.Element {
  const [products, setProducts] = useState<ProductI[]>([]);
  const [isGetLoading, setGetLoading] = useState(false);
  const [isSavingData, setSavingData] = useState(false);

  useEffect(() => {
    fetchGetProducts();
  }, []);

  const fetchGetProducts = async () => {
    setGetLoading(true);
    try {
      const response = await rest.getProducts();

      setProducts(response.data);
    } finally {
      setGetLoading(false);
    }
  };

  const createNewProduct = async (data: ProductI) => {
    setSavingData(true);
    const productIds = products.map(product => Number(product.productId));
    const withoutNaN = productIds.filter(product => !isNaN(product));

    const maxProductIdNumber = productIds.length ? Math.max(...withoutNaN) : 0;

    try {
      const submitData = {
        ...data,
        productId: String(maxProductIdNumber + 1),
      };

      await rest.createProduct(submitData);

      fetchGetProducts();
    } finally {
      setSavingData(false);
    }
  };

  const editProduct = async (data: ProductI) => {
    setSavingData(true);
    try {
      await rest.editProduct(data);

      fetchGetProducts();
    } finally {
      setSavingData(false);
    }
  };

  return (
    <>
      <ProductsContext.Provider
        value={{
          products,
          isGetLoading,
          isSavingData,
          fetchGetProducts,
          createNewProduct,
          editProduct,
        }}
      >
        {children}
      </ProductsContext.Provider>
    </>
  );
}
