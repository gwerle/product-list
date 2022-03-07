import {
  fireEvent,
  getByPlaceholderText,
  waitFor,
} from '@testing-library/react';
import ProductsTable from '../../components/ProductsTable';
import { render } from '../../utils/test-utils';
import { PRODUCT_LIST } from '../../__mocks__/ProductListApiMock';

import * as service from '../../services/ProductsService';

describe('ProductTable', () => {
  it('Should render ProductTable component without error', () => {
    render(<ProductsTable products={PRODUCT_LIST} />);
  });

  it('should open Modal when click in Edit Product button', () => {
    const { getAllByLabelText, getByText } = render(
      <ProductsTable products={PRODUCT_LIST} />,
    );

    const editButton = getAllByLabelText('Edit item')[0];

    fireEvent.click(editButton);

    const modalSaveButton = getByText(/Save/);
    expect(modalSaveButton).toBeInTheDocument();
  });

  it('should open Modal when click in Edit Product button', async () => {
    const { getAllByLabelText, getByText } = render(
      <ProductsTable products={PRODUCT_LIST} />,
    );

    const editButton = getAllByLabelText('Edit item')[0];

    fireEvent.click(editButton);

    const modalSaveButton = getByText(/Save/);

    expect(modalSaveButton).toBeInTheDocument();
  });

  it('should call put api when save button is clicked', () => {
    const mockCall = jest.spyOn(service, 'editProduct');

    const { getAllByLabelText, getByText } = render(
      <ProductsTable products={PRODUCT_LIST} />,
    );

    const editButton = getAllByLabelText('Edit item')[0];

    fireEvent.click(editButton);

    const modalSaveButton = getByText(/Save/);

    fireEvent.click(modalSaveButton);

    waitFor(() => {
      expect(mockCall).toHaveBeenCalledTimes(1);
    });
  });
});
