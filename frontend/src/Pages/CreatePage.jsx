import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";


const CreatePage = () => {
    const [newProduct, setProduct] = useState({name:'', price:'', image:''});

    const toast = useToast();
    const {createProducts} = useProductStore();
    const handleSubmit = async ()=>{
        const {success, message} = await createProducts(newProduct);
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
       setProduct({name:'', price:'', image:''}); // Fresh start
    };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8} mt={24}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
            Create New Product
        </Heading>
        <Box w={"full"} bg={useColorModeValue("white.200", "gray.700")} p={6} rounded={"lg"} shadow={"md"}> 
            <VStack spacing={"4"}>
               <Input placeholder="Name" name="name" value={newProduct.name} onChange={(e)=> setProduct({...newProduct, name: e.target.value})}  />
               <Input placeholder="Price" name="price" type="number"  value={newProduct.price} onChange={(e)=> setProduct({...newProduct, price: e.target.value})}  />
               <Input placeholder="Image URL" name="image"  value={newProduct.image} onChange={(e)=> setProduct({...newProduct, image: e.target.value})}  />
               <Button colorScheme="blue"  w={"full"} onClick={handleSubmit} >Add Product</Button>
            </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CreatePage;