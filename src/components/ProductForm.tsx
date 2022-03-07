import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { ProductI } from '../@types/api/ProductsList';
import { useProducts } from '../contexts/ProductsContext/useProducts';

type ProductInputProps = {
  label: string;
  type: string;
  InputProps: InputProps;
};

const ProductInput = ({
  label,
  type,
  InputProps,
}: ProductInputProps): JSX.Element => {
  return (
    <FormControl m="10px" width={300}>
      <FormLabel fontSize="12px" htmlFor={InputProps?.name}>
        {label}
      </FormLabel>
      <Input mr="20px" type={type} size="sm" {...InputProps} />
    </FormControl>
  );
};

type ProductFormProps = {
  isOpen: boolean;
  handleClickCloseIcon: () => void;
  editMode: boolean;
  product?: ProductI;
};

export default function ProductForm({
  isOpen,
  handleClickCloseIcon,
  editMode,
  product,
}: ProductFormProps) {
  const { createNewProduct, editProduct, isSavingData } = useProducts();
  const { register, handleSubmit } = useForm<ProductI>({
    defaultValues: editMode ? product : {},
  });

  const onSubmitForm = (data: ProductI) => {
    if (editMode) {
      editProduct(data);
      handleClickCloseIcon();
      return;
    }

    createNewProduct(data);
    handleClickCloseIcon();
    return;
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClickCloseIcon} size="3xl">
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <ModalContent>
          <ModalHeader>{editMode ? 'Edit Product' : 'Add Product'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexWrap="wrap" justifyContent={'center'}>
              <ProductInput
                label="Item Name"
                type="text"
                InputProps={{ ...register('item') }}
              />
              <ProductInput
                label="Price"
                type="text"
                InputProps={{ ...register('price') }}
              />
              <ProductInput
                label="Category Id"
                type="number"
                InputProps={{ ...register('catId') }}
              />
              <ProductInput
                label="Unit of Measure"
                type="text"
                InputProps={{ ...register('uom') }}
              />
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent="center" mt={'3'}>
            <Button
              width="70%"
              colorScheme="orange"
              mr={3}
              type="submit"
              isLoading={isSavingData}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
