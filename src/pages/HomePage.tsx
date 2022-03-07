import { CircularProgress, Flex } from '@chakra-ui/react';

import ProductsTable from '../components/ProductsTable';
import { useProducts } from '../contexts/ProductsContext/useProducts';

export default function HomePage() {
  const { products, isGetLoading } = useProducts();

  return (
    <>
      {isGetLoading ? (
        <Flex
          width={'100vw'}
          height={'80vh'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <CircularProgress isIndeterminate color="green.300" />
        </Flex>
      ) : (
        <ProductsTable products={products} />
      )}
    </>
  );
}
