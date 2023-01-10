import {
  Button,
  Flex,
  SimpleGrid,
  Icon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Text,
  Card as UICard,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { NextSeo } from "next-seo";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { Card } from "lib/components/Card";
import { api } from "services/api";

const Home = () => {
  const [page, setPage] = useState(1);
  const [pageEpisode, setPageEpisode] = useState(1);
  const [pageLocation, setPageLocation] = useState(1);

  const { data } = useQuery(
    ["characters", page],
    () => api.getCharacters(page),
    {
      keepPreviousData: true,
      staleTime: 3000,
    }
  );

  const { data: episodes } = useQuery(
    ["episodes", pageEpisode],
    () => api.getEpisodes(pageEpisode),
    {
      keepPreviousData: true,
      staleTime: 3000,
    }
  );

  const { data: locations } = useQuery(
    ["locations", pageLocation],
    () => api.getLocations(pageLocation),
    {
      keepPreviousData: true,
      staleTime: 3000,
    }
  );

  return (
    <Tabs>
      <TabList alignItems="center">
        <Tab fontSize="2xl" textTransform="uppercase">
          Personagens
        </Tab>
        <Tab fontSize="2xl" textTransform="uppercase">
          Episódios
        </Tab>
        <Tab fontSize="2xl" textTransform="uppercase">
          Localização
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
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

            <SimpleGrid columns={[1, 1, 3, 4]} gap="2">
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

              <Button
                mx={1}
                px={4}
                py={2}
                rounded="md"
                bg="white"
                color="gray.700"
              >
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
                onClick={() =>
                  setPage((old) => (data?.info.next ? old + 1 : old))
                }
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
        </TabPanel>
        <TabPanel>
          <SimpleGrid columns={[1, 1, 3, 4]} gap="2">
            {episodes?.results.map((episode) => {
              return (
                <UICard>
                  <CardHeader>
                    <Heading size="md" textTransform="uppercase">
                      {episode.episode}
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Heading size="md" textTransform="uppercase" mb={4}>
                      {episode.name}
                    </Heading>
                    <Text>{episode.air_date} </Text>
                  </CardBody>
                  <CardFooter>
                    <Button>View here</Button>
                  </CardFooter>
                </UICard>
              );
            })}
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
              onClick={() => setPageEpisode((old) => Math.max(old - 1, 1))}
              disabled={pageEpisode === 1}
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

            <Button
              mx={1}
              px={4}
              py={2}
              rounded="md"
              bg="white"
              color="gray.700"
            >
              {pageEpisode}
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
              onClick={() =>
                setPageEpisode((old) => (episodes?.info.next ? old + 1 : old))
              }
              disabled={!episodes?.info.next}
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
        </TabPanel>
        <TabPanel>
          <SimpleGrid columns={[1, 1, 3, 4]} gap="2">
            {locations?.results.map((location) => {
              return (
                <UICard>
                  <CardHeader>
                    <Heading size="md" textTransform="uppercase">
                      {location.name}
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Heading size="md" textTransform="uppercase" mb={4}>
                      {location.dimension}
                    </Heading>
                    <Text>{location.type} </Text>
                  </CardBody>
                  <CardFooter>
                    <Button>View here</Button>
                  </CardFooter>
                </UICard>
              );
            })}
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
              onClick={() => setPageLocation((old) => Math.max(old - 1, 1))}
              disabled={pageLocation === 1}
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

            <Button
              mx={1}
              px={4}
              py={2}
              rounded="md"
              bg="white"
              color="gray.700"
            >
              {pageLocation}
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
              onClick={() =>
                setPageEpisode((old) => (locations?.info.next ? old + 1 : old))
              }
              disabled={!locations?.info.next}
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
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Home;
