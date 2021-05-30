import {
  Flex,
  Box,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
  Button,
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

type CreateImageFormData = {
  image: string;
  tag: string;
};

const CreateImageFormSchema = yup.object().shape({
  image: yup.string().required(),
  tag: yup.string().required(),
});

export default function CreateImage() {
  const router = useRouter();
  const createImage = useMutation(
    async (user: CreateImageFormData) => {
      try {
        const response = await api.post(
          `images/create?fromImage=${user.image}&tag=${user.tag}`
        );
        return response.data;
      } catch (error) {

      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("images");
      }
    }
  );

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(CreateImageFormSchema),
  });

  const { errors } = formState;

  const handleCreateImage: SubmitHandler<CreateImageFormData> = async (
    values
  ) => {
    await createImage.mutateAsync(values);
    router.push("/images");
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
          onSubmit={handleSubmit(handleCreateImage)}
        >
          <Heading size="lg" fontWeight="normal">
            Create image
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="image"
                label="Image"
                error={errors.image}
                {...register("image")}
              />
              <Input
                name="tag"
                label="Tag"
                error={errors.tag}
                {...register("tag")}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/images" passHref>
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
