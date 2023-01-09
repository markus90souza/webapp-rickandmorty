import { Flex, SimpleGrid } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

import type { CharacterData } from "lib/components/Card";
import { Card } from "lib/components/Card";
import { api } from "services/api";

const Home = () => {
  const [character, setCharacter] = useState<CharacterData[]>([]);
  const getCharacters = async () => {
    const { data } = await api.get("/character");

    setCharacter(data.results);
  };

  useEffect(() => {
    getCharacters();
  }, []);

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

      <SimpleGrid columns={[1, 2, 3]} gap="2">
        {character.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Home;
