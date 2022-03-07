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

  const isSavingData = useContextSelector(
    ProductsContext,
    products => products.isSavingData,
  );

  const createNewProduct = useContextSelector(
    ProductsContext,
    products => products.createNewProduct,
  );

  const editProduct = useContextSelector(
    ProductsContext,
    products => products.editProduct,
  );

  return {
    products,
    fetchGetProducts,
    isGetLoading,
    isSavingData,
    createNewProduct,
    editProduct,
  };
};
