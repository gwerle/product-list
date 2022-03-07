import HomePage from '../../pages/HomePage';
import { render } from '../../utils/test-utils';

describe('HomePage', () => {
  it('Should render HomePage without error', () => {
    render(<HomePage />);
  });
});
