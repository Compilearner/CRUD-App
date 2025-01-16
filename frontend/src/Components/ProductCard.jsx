/* eslint-disable */

import { Box, Button, Heading, HStack, IconButton, Input, Image , Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack} from "@chakra-ui/react"
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useProductStore } from "../store/product";
import { useEffect, useState } from "react";

const ProductCard = ({product}) => {
const [initialProduct, setInitialProduct] = useState(product);



const textColor = useColorModeValue("gray.600", "gray.200");
const bg = useColorModeValue("white", "gray.800");


const {deleteProduct, updateProduct} = useProductStore();

const {isOpen, onOpen, onClose} = useDisclosure();

const toast = useToast();

// Handle Delete operation
const handleDelete = async (id)=>{
  const {success, message} = await deleteProduct(id);
  if(!success){
          toast({
            title : "Error",
            description: message,
            status: "error",
            isClosable: true,
          });
        }else{
          toast({
            title : "Success",
            description: message,
            status: "success",
            isClosable: true,
          });
        }
}

// Handle Update operation
const handleUpdate = async (id)=>{
const {success, message} = await updateProduct(id, initialProduct);
 onClose(); //Modal close after change

 if(!success){
          toast({
            title : "Error",
            description: message,
            status: "error",
            isClosable: true,
          });
        }else{
          toast({
            title : "Success",
            description: message,
            status: "success",
            isClosable: true,
          });
        }
}

  return (
    <Box shadow={'lg'} rounded={"lg"} overflow={"hidden"} transition={"all 0.3s"} _hover={{transform: "translateY(-5px)", shadow:"xl"}} bg={bg}>
       <Image src={product.image} alt={product.name} h={"400px"} w="full" objectFit={"cover"} />
       <Box p={4}>
        <Heading as={'h3'} size={"md"} mb={2}>
            {product.name}
        </Heading>

        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor}  mb={4}>
            ${product.price}
        </Text>

        <HStack spacing={2}>
           <IconButton icon={<FaEdit/>} colorScheme="blue" onClick={onOpen}/>
           <IconButton icon={<FaTrash/>} colorScheme="red" onClick={()=> handleDelete(product._id)}/>
        </HStack>
       </Box>

      {/** Modal for Update Product */}
       <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
           <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
              <VStack spacing={"4"}>
                             <Input placeholder="Name" name="name" value={initialProduct.name} onChange={(e)=>{setInitialProduct({...initialProduct, [e.target.name] : e.target.value})}} />
                             <Input placeholder="Price" name="price" type="number" value={initialProduct.price} onChange={(e)=>{setInitialProduct({...initialProduct,  [e.target.name]: e.target.value})}} />
                             <Input placeholder="Image URL" name="image" value={initialProduct.image} onChange={(e)=>{setInitialProduct({...initialProduct,  [e.target.name]: e.target.value})}} />
                          </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={()=>handleUpdate(product._id)}>Update</Button>
              <Button variant={"ghost"} onClick={onClose} >Cancel</Button>
            </ModalFooter>
           </ModalContent>
        </ModalOverlay>
       </Modal>
     </Box>  
  );
}

export default ProductCard