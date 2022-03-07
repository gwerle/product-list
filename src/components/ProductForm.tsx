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
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import * as rest from '../services/ProductsService';
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
  const { products, fetchGetProducts } = useProducts();
  const [isSavingData, setSavingData] = useState(false);
  const { register, handleSubmit, reset } = useForm<ProductI>({
    defaultValues: editMode ? product : {},
  });

  const createNewProduct = async (data: ProductI) => {
    setSavingData(true);
    const productIds = products.map(product => Number(product.productId));
    const withoutNaN = productIds.filter(product => !isNaN(product));

    const maxProductIdNumber = productIds.length ? Math.max(...withoutNaN) : 0;

    try {
      const submitData = {
        ...data,
        productId: String(maxProductIdNumber + 1),
      };

      await rest.createProduct(submitData);

      fetchGetProducts();
      reset();
    } finally {
      setSavingData(false);
    }
  };

  const editProduct = async (data: ProductI) => {
    setSavingData(true);
    try {
      await rest.editProduct(data);

      fetchGetProducts();
    } finally {
      setSavingData(false);
    }
  };

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
