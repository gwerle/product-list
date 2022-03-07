import { fireEvent } from '@testing-library/react';
import Header from '../../components/Header';
import { render } from '../../utils/test-utils';

describe('Header', () => {
  it('Should render Header component without error', () => {
    render(<Header />);
  });

  it('should open Modal when click in Add Product button', () => {
    const { getByText } = render(<Header />);

    const button = getByText(/Add Product/);

    fireEvent.click(button);

    const modalSaveButton = getByText(/Save/);
    expect(modalSaveButton).toBeInTheDocument();
  });
});
