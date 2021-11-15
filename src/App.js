import React from "react";
import { Switch, Route, Link, useLocation } from "react-router-dom";

import {
  Button,
  Flex,
  Container,
  Box,
  IconButton,
  Collapse,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { SmallCloseIcon, HamburgerIcon } from "@chakra-ui/icons";

import BoardgamesList from "./screens/BoardgamesList";
import RecordGame from "./screens/RecordGame";
import PlayersList from "./screens/PlayersList";
import PlayerDetails from "./screens/PlayerDetails";
import GameRecordList from "./screens/GameRecordList";

function App() {
  const currentLocation = useLocation().pathname;
  const { isOpen, onToggle } = useDisclosure();

  const linkMap = [
    {
      path: "/",
      linkName: "Record",
    },
    {
      path: "/boardgameList",
      linkName: "Boardgames",
    },
    {
      path: "/playersList",
      linkName: "Players",
    },
    {
      path: "/gameRecordList",
      linkName: "History",
    },
  ];

  return (
    <Flex direction={"column"} style={{ height: "100vh" }}>
      <Flex bg={"blue.100"}>
        <Container maxW="container.xl" pt={2} pb={2}>
          {/* desktop nav */}
          <Box
            display={{ base: "none", md: "flex" }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex>
              {linkMap.map((link) => {
                return (
                  <Link to={link.path} key={link.linkName}>
                    <Button
                      colorScheme="blue"
                      variant={
                        currentLocation === link.path ? "solid" : "ghost"
                      }
                    >
                      {link.linkName}
                    </Button>
                  </Link>
                );
              })}
            </Flex>
            <Text color="blue.700" fontSize="xl" fontWeight="black">
              SCOREBOARD
            </Text>
          </Box>

          {/* mobile nav */}
          <Flex display={{ base: "flex", md: "none" }} flexDirection="column">
            <Flex alignItems="center" justifyContent="space-between">
              <Text color="blue.700" fontSize="xl" fontWeight="black">
                SCOREBOARD
              </Text>
              <IconButton
                onClick={onToggle}
                icon={isOpen ? <SmallCloseIcon /> : <HamburgerIcon />}
                mb={2}
              />
            </Flex>
            <Collapse in={isOpen} animateOpacity>
              <Stack>
                {linkMap.map((link) => {
                  return (
                    <Link
                      to={link.path}
                      key={link.linkName}
                      style={{
                        display: "flex",
                        backgroundColor:
                          currentLocation === link.path
                            ? "rgba(255,255,255,0.5)"
                            : null,
                        height: 50,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={onToggle}
                    >
                      <Text color="blue.500" fontWeight="bold">
                        {link.linkName}
                      </Text>
                    </Link>
                  );
                })}
              </Stack>
            </Collapse>
          </Flex>
        </Container>
      </Flex>

      <Container maxW="container.xl" p={4}>
        <Switch>
          <Route exact path={"/"} component={RecordGame} />
          <Route exact path={"/boardgameList"} component={BoardgamesList} />
          <Route exact path={"/playersList"} component={PlayersList} />
          <Route exact path={"/gameRecordList"} component={GameRecordList} />
          <Route
            exact
            path={"/playersList/:id/playerDetails"}
            component={PlayerDetails}
          />
        </Switch>
      </Container>
    </Flex>
  );
}
export default App;
