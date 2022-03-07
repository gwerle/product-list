import { useContextSelector } from 'use-context-selector';

import { ProductsContext } from '.';
import { ProductsContextData } from './types';

export const useProducts = (): ProductsContextData => {
  const products = useContextSelector(
    ProductsContext,
    products => products.products,
  );

  const fetchGetProducts = useContextSelector(
    ProductsContext,
    products => products.fetchGetProducts,
  );

  const isGetLoading = useContextSelector(
    ProductsContext,
    products => products.isGetLoading,
  );

  return {
    products,
    fetchGetProducts,
    isGetLoading,
  };
};
