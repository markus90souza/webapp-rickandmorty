import { Button, Flex, SimpleGrid, Icon } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { NextSeo } from "next-seo";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { Card } from "lib/components/Card";
import { api } from "services/api";

const Home = () => {
  const [page, setPage] = useState(1);

  const { data } = useQuery(
    ["characters", page],
    () => api.getCharacters(page),
    {
      keepPreviousData: true,
      staleTime: 3000,
    }
  );

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={4}
      mb={8}
      w="full"
    >
      <NextSeo title="Home" />

      <SimpleGrid columns={[1, 1, 2, 3]} gap="2">
        {data?.results.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </SimpleGrid>

      <Flex p={50} w="full" alignItems="center" justifyContent="center">
        <Button
          mx={1}
          px={4}
          py={2}
          rounded="md"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          _hover={{
            bg: "gray.600",
          }}
          color="gray.700"
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          <Icon
            as={IoIosArrowBack}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
            boxSize={4}
          />
        </Button>

        <Button mx={1} px={4} py={2} rounded="md" bg="white" color="gray.700">
          {page}
        </Button>

        <Button
          mx={1}
          px={4}
          py={2}
          rounded="md"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          color="gray.700"
          onClick={() => setPage((old) => (data?.info.next ? old + 1 : old))}
          disabled={!data?.info.next}
        >
          <Icon
            as={IoIosArrowForward}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
            boxSize={4}
          />
        </Button>
        <Flex />
      </Flex>
    </Flex>
  );
};

export default Home;
