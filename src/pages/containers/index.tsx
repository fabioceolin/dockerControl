import NextLink from "next/link";
import {
  Spinner,
  Flex,
  SimpleGrid,
  Text,
  Icon,
  Box,
  Heading,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { RiAddLine, RiDeleteBin2Line, RiPlayFill, RiStopFill } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useContainers } from "../../services/hooks/useContainers";
import { api } from "../../services/api";

export default function Containerlist() {
  const { data, isLoading, isFetching, error, refetch } = useContainers();

  async function handleDeleteAll() {
    data.forEach(element => {
      api.delete(`containers/${element.Id}?force=true`);
    });
    refetch();
  }

  async function handleDeleteContainer(id: string) {
    await api.delete(`containers/${id}`);
    refetch();
  }
  async function handleStartContainer(id: string) {
    await api.post(`containers/${id}/start`);
    refetch();
  }
  async function handleStopContainer(id: string) {
    await api.post(`containers/${id}/stop`);
    refetch();
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Containers
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>
            <Flex>
              <NextLink href="/containers/create" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Create Container
                </Button>
              </NextLink>
              <Button
                ml="4"
                size="sm"
                fontSize="sm"
                colorScheme="red"
                leftIcon={<Icon as={RiDeleteBin2Line} fontSize="20" />}
              >
                Delete All
              </Button>
            </Flex>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <SimpleGrid
                flex="1"
                gap="4"
                minChildWidth="320px"
                align="flex-start"
              >
                {data.map((container) => {
                  return (
                    <Box
                      key={container.Id}
                      p="8"
                      bg="gray.800"
                      borderRadius={8}
                      pb="4"
                    >
                      <Box
                        d="flex"
                        overflow="hidden"
                        justifyContent="space-between"
                      >
                        <Box>
                          <Text fontSize="sm" color="gray.500">
                            Id
                          </Text>
                          <Text fontSize="lg" mb="4">
                            {container.Id}
                          </Text>
                        </Box>
                        <Box>
                          <Text fontSize="sm" color="gray.500">
                            Image
                          </Text>
                          <Text fontSize="lg" mb="4">
                            {container.Image}
                          </Text>
                        </Box>
                      </Box>
                      <Box d="flex" justifyContent="space-between">
                        <Box>
                          <Text fontSize="sm" color="gray.500">
                            State
                          </Text>
                          {container.State === "running" ? (
                            <Text fontSize="lg" mb="4" color="green.400">
                              {container.State}
                            </Text>
                          ) : (
                            <Text fontSize="lg" mb="4" color="red.400">
                              {container.State}
                            </Text>
                          )}
                        </Box>
                        {container.Ports[0] && (
                          <Box>
                            <Text fontSize="sm" color="gray.500">
                              Port/Type
                            </Text>
                            <Text fontSize="lg" mb="4">
                              {container.Ports[0]?.PrivatePort}/
                              {container.Ports[0]?.Type}
                            </Text>
                          </Box>
                        )}
                        <Box>
                          <Text fontSize="sm" color="gray.500">
                            Status
                          </Text>
                          <Text fontSize="lg" mb="4">
                            {container.Status}
                          </Text>
                        </Box>
                      </Box>
                      <Text fontSize="sm" color="gray.500">
                        Name
                      </Text>
                      <Text fontSize="lg" mb="4">
                        {container.Names[0]}
                      </Text>
                      <Box d="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                          <IconButton 
                            aria-label="Start Container" 
                            size="sm" 
                            colorScheme="green" 
                            fontSize="xl" 
                            icon={<RiPlayFill />}
                            isDisabled={container.State === "running"}
                            onClick={() => handleStartContainer(container.Id)}
                          />
                          <IconButton 
                            aria-label="Stop Container" 
                            ml="2" 
                            size="sm" 
                            colorScheme="red" 
                            fontSize="md" 
                            icon={<RiStopFill />}
                            isDisabled={container.State !== "running"}
                            onClick={() => handleStopContainer(container.Id)}
                          />
                        </Box>
                        <Box>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="red"
                            leftIcon={
                              <Icon as={RiDeleteBin2Line} fontSize="20" />
                            }
                            onClick={() => handleDeleteContainer(container.Id)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </SimpleGrid>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
