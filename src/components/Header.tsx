import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import { ColorModeSwitcher } from '../utils/ColorModeSwitcher';
import ProductForm from './ProductForm';

export default function Header() {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex justifyContent={'flex-end'}>
        <Button colorScheme={'orange'} onClick={onOpen}>
          + Add Product
        </Button>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>
      <ProductForm
        editMode={false}
        handleClickCloseIcon={onClose}
        isOpen={isOpen}
      />
    </>
  );
}
