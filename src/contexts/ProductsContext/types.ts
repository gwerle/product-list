import { ProductI } from '../../@types/api/ProductsList';

export type ProductsContextData = {
  products: ProductI[];
  isGetLoading: boolean;
  fetchGetProducts: () => Promise<void>;
};
