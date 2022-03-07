import { AxiosResponse } from 'axios';

import { ProductI } from '../@types/api/ProductsList';
import api from './api';

export function getProducts(): Promise<AxiosResponse<ProductI[]>> {
  return api.get('/products');
}

export function editProduct(data: ProductI): Promise<AxiosResponse<ProductI>> {
  return api.put(`/products/${data.productId}`, data);
}

export function createProduct(
  data: ProductI,
): Promise<AxiosResponse<ProductI>> {
  return api.post('/products', data);
}
