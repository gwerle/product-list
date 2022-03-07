import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Button,
  Flex,
} from '@chakra-ui/react';

import { ProductsProvider } from './contexts/ProductsContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid p={3}>
        <ProductsProvider>
          <Header />
          <HomePage />
        </ProductsProvider>
      </Grid>
    </Box>
  </ChakraProvider>
);
