import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { FaPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
 const {colorMode, toggleColorMode} = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"} flexDir={{base:"column", sm:"row"}}>
        {/** Left Part */}
        <Link to={"/"}>
          <Text fontSize={{base:"22", sm:"28"}} fontWeight={"bold"} textTransform={"uppercase"} textAlign={"center"} bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"}>
            Product Store 🛒
          </Text>
        </Link>

           {/** Right Part */}
          <HStack spacing={2} alignItems={"center"}>
            <Link to={"/create"}>
            <Button>
                <FaPlusSquare fontSize={20}/>
            </Button>
            </Link>

            <Button onClick={toggleColorMode}>
                {colorMode === "light" ? "🌙" : "🌞"}
            </Button>
          </HStack>
        </Flex>
    </Container>
  );
}

export default Navbar;