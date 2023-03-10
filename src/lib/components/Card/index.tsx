import {
  Heading,
  Avatar,
  Box,
  Center,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

import type { CharacterModel } from "models/Character";

interface CardProps {
  data: CharacterModel;
}

export function Card({ data }: CardProps) {
  return (
    <Center py={6}>
      <Box
        maxW="300px"
        minHeight="auto"
        padding="4"
        w="full"
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="2xl"
        rounded="md"
        overflow="hidden"
      >
        <Flex justify="center">
          <Avatar
            size="xl"
            src={data.image}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align="center" mb={5}>
            <Heading
              textTransform="uppercase"
              fontSize="lg"
              fontWeight={500}
              fontFamily="body"
            >
              {data.name}
            </Heading>
            <Text color="gray.500">
              {
                // eslint-disable-next-line no-nested-ternary
                data.status === "Alive"
                  ? "Vivo"
                  : data.status === "Dead"
                  ? "Morto"
                  : "Não se sabe"
              }
            </Text>
          </Stack>

          <Stack direction="row" justify="center" spacing={6}>
            <Stack spacing={0} align="center">
              <Text fontWeight={600}>Gênero</Text>
              <Text fontSize="sm" color="gray.500">
                {data.gender}
              </Text>
            </Stack>
            <Stack spacing={0} align="center">
              <Text fontWeight={600}>Especie</Text>
              <Text fontSize="sm" color="gray.500">
                {data.species}
              </Text>
            </Stack>
          </Stack>

          <Button
            w="full"
            mt={8}
            bg={useColorModeValue("#151f21", "gray.900")}
            color="white"
            rounded="md"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            Detalhes
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
