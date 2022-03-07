import { IconButton, Td, Tr, useDisclosure } from '@chakra-ui/react';
import { ProductI } from '../@types/api/ProductsList';
import ProductForm from './ProductForm';

import { MdEdit } from 'react-icons/md';

type Props = {
  product: ProductI;
  usedKeys: {
    id: string;
    label: string;
  }[];
};

export default function ProductsTableItem({ product, usedKeys }: Props) {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <Tr key={product.productId}>
        {usedKeys.map(key => {
          return (
            <Td
              p="5px"
              fontSize="12px"
              maxWidth="200px"
              key={`${product.productId}${key.id}`}
            >
              {product[key.id as keyof ProductI]}
            </Td>
          );
        })}
        <Td textAlign="right">
          <div>
            <IconButton
              size={'xs'}
              colorScheme="gray"
              aria-label="Edit item"
              icon={<MdEdit />}
              onClick={onOpen}
            />
          </div>
        </Td>
      </Tr>

      <ProductForm
        isOpen={isOpen}
        handleClickCloseIcon={onClose}
        editMode
        product={product}
      />
    </>
  );
}
