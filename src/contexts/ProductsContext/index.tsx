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

  return (
    <>
      <ProductsContext.Provider
        value={{
          products,
          isGetLoading,
          fetchGetProducts,
        }}
      >
        {children}
      </ProductsContext.Provider>
    </>
  );
}
