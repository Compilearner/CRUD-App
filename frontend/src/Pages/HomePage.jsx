import { Container,  SimpleGrid,  Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore} from "../store/product";
import { useEffect } from "react";
import ProductCard from "../Components/ProductCard";

const HomePage = () => {
const {products, fetchProducts} = useProductStore();

useEffect(()=>{ 
 fetchProducts();
},[fetchProducts]);
console.log("List of Products in database: ", products);

  return (
    <Container maxW={'container.xl'} py={12}>
      <VStack spacing={8}>
         <Text fontSize={{base:"22", sm:"28"}} fontWeight={"bold"} textTransform={"uppercase"} textAlign={"center"} bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"}>
                  Current Products 🚀
        </Text>

        <SimpleGrid columns={{base: 1, md:2, lg:3}} spacing={10} w={"full"}>
      {products.map((product)=>{
        return <ProductCard key={product._id} product={product} />;
      })}
    </SimpleGrid>

      {products.length === 0 && <Text fontSize={'xl'} textAlign={"center"} fontWeight={"bold"} color={"gray.500"}>
        No Products found 😢{"  "}
        <Link to={"/create"}>
        <Text as={'span'} color={"blue.500"} _hover={{textDecoration: "underline"}}>Create a Product</Text>
        </Link>
      </Text>}
      </VStack>
    </Container>
  );
}

export default HomePage;