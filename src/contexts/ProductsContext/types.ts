import { ProductI } from '../../@types/api/ProductsList';

export type ProductsContextData = {
  products: ProductI[];
  isGetLoading: boolean;
  isSavingData: boolean;
  fetchGetProducts: () => Promise<void>;
  createNewProduct: (data: ProductI) => Promise<void>;
  editProduct: (data: ProductI) => Promise<void>;
};
