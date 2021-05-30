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
} from "@chakra-ui/react";
import { RiAddLine, RiDeleteBin2Line } from "react-icons/ri";

import filesize from "filesize";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useImages } from "../../services/hooks/useImages";
import { api } from "../../services/api";

export default function Imagelist() {
  const { data, isLoading, isFetching, error, refetch } = useImages();

  async function handleDeleteImage(id: string) {
    await api.delete(`images/${id}?force=true`);
    refetch();
  }

  async function handleDeleteAll() {
    data.forEach(element => {
      api.delete(`images/${element.Id}?force=true`);
    });
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
              Images
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>
            <Flex>
              <NextLink href="/images/create" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Create Image
                </Button>
              </NextLink>
              <Button
                ml="4"
                size="sm"
                fontSize="sm"
                colorScheme="red"
                leftIcon={<Icon as={RiDeleteBin2Line} fontSize="20" />}
                onClick={() => handleDeleteAll()}
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
                {data.map((image) => {
                  return (
                    <Box key={image.Id} p="8" bg="gray.800" borderRadius={8} pb="4">
                      <Box>
                        <Text fontSize="sm" color="gray.500">
                          Id
                        </Text>
                        <Text fontSize="lg" mb="4">
                          {image.Id}
                        </Text>
                      </Box>
                      {image.RepoTags && (
                        <Box>
                          <Text fontSize="sm" color="gray.500">
                            RepoTags
                          </Text>

                          <Text fontSize="lg" mb="4">
                            {image.RepoTags}
                          </Text>
                        </Box>
                      )}
                      <Box d="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Text fontSize="sm" color="gray.500">
                            Size
                          </Text>
                          <Text fontSize="lg" mb="4">
                            {filesize(image.Size)}
                          </Text>
                        </Box>
                        <Button
                          as="a"
                          size="sm"
                          fontSize="sm"
                          colorScheme="red"
                          leftIcon={
                            <Icon as={RiDeleteBin2Line} fontSize="20" />
                          }
                          onClick={() => handleDeleteImage(image.Id)}
                        >
                          Delete
                        </Button>
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
