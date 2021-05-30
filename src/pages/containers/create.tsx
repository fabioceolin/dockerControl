import {
  Flex,
  Box,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
  Select,
  Button,
  FormControl,
  FormLabel,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useMutation } from "react-query";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Form/Input";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";
import { useImages } from "../../services/hooks/useImages";
import React from "react";

type CreateContainerFormData = {
  name: string;
  image: string;
};

const CreateUserFormSchema = yup.object().shape({
  name: yup.string().required("Name required"),
  image: yup.string().required("Imagem  required"),
});

export default function CreateUser() {
  const router = useRouter();
  const createContainer = useMutation(
    async (container: CreateContainerFormData) => {
      const response = await api.post(
        `containers/create?name=${container.name}`,
        {
          Image: container.image,
          Entrypoint: "bash",
        }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("containers");
      },
    }
  );

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(CreateUserFormSchema),
  });

  const { data, isLoading } = useImages();

  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateContainerFormData> = async (
    values
  ) => {
    await createContainer.mutateAsync(values);

    router.push("/containers");
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Create container
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                label="Name"
                error={errors.name}
                {...register("name")}
              />

              <FormControl id="country">
                <FormLabel>Image</FormLabel>
                {isLoading ? (
                  <Text>Carregando...</Text>
                ) : (
                  <Select
                    height="12"
                    fontSize="lg"
                    bg="gray.900"
                    border="2px"
                    borderColor="transparent"
                    focusBorderColor="pink.500"
                    {...register("image")}
                  >
                    {data.map((image) => {
                      return (
                        <option
                          key={image.Id}
                          style={{ backgroundColor: "#181B23" }}
                          value={image.RepoTags}
                        >
                          {image.RepoTags}
                        </option>
                      );
                    })}
                  </Select>
                )}
              </FormControl>
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/containers" passHref>
                <Button colorScheme="whiteAlpha">Cancel</Button>
              </Link>
              <Button
                colorScheme="pink"
                type="submit"
                isLoading={formState.isSubmitting}
              >
                Save
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
