import { Flex, SimpleGrid, Box, Text, theme } from "@chakra-ui/react"
import { Header } from "../components/Header"
import { Sidebar } from "../components/Sidebar"
import { useContainers } from "../services/hooks/useContainers";
import { useImages } from "../services/hooks/useImages";

export default function Dashboard() {
  const containers = useContainers();
  const images = useImages();

  return(
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box
            p={["6","8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4">Containers</Text>
            <Text fontSize="9xl">{containers.data?.length}</Text>
          </Box>
          <Box
            p="8"
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4">Images</Text>
            <Text fontSize="9xl">{images.data?.length}</Text>
          </Box>

        </SimpleGrid>
      </Flex>
    </Flex>
    )
}