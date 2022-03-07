import { ProductI } from '../@types/api/ProductsList';
import { Table, Tbody, Td, Th, Thead, Tr, Flex } from '@chakra-ui/react';
import ProductsTableItem from './ProductsTableItem';

type Props = {
  products: ProductI[];
};

const usedKeys = [
  { id: 'productId', label: 'Id', width: '10%' },
  { id: 'item', label: 'Item', width: '30%' },
  { id: 'price', label: 'Price', width: '20%' },
  { id: 'catId', label: 'Category Id', width: '15%' },
  { id: 'uom', label: 'Unit of Measure', width: '15%' },
];

export default function ProductsTable({ products }: Props) {
  return (
    <Flex mt="20px">
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            {usedKeys.map(key => {
              return (
                <Th p="5px" width={key.width} key={key.id}>
                  {key.label}
                </Th>
              );
            })}
            <Th p="5px" width={'10%'} />
          </Tr>
        </Thead>
        <Tbody>
          {products.map(product => {
            return (
              <ProductsTableItem
                key={`item-${product.productId}`}
                product={product}
                usedKeys={usedKeys}
              />
            );
          })}
        </Tbody>
      </Table>
    </Flex>
  );
}
