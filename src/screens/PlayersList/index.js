import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import AddPlayerFields from "../../components/AddPlayerFIelds";
import { useQuery } from "@apollo/client";
import { READ_ALL } from "../../graphql/operations";
import AppTable from "../../components/AppTable";

function PlayersList() {
  const { loading, data } = useQuery(READ_ALL);
  let players, gameRecords;
  if (!loading && data) {
    players = data.players;
    gameRecords = data.gameRecords;
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newPlayers, setNewPlayers] = useState(null);

  const handleSubmit = () => {
    // if (newPlayers === null) {
    //   return;
    // }
    // const data = [...newPlayers];
    // onClose();
  };

  const handleNewPlayers = (players) => {
    setNewPlayers([...players]);
  };

  const contentMap = {
    headerContent: ["First Name", "Last Name", "Games Played"],
    bodyContent: players.map((player) => {
      return [player.firstName, player.lastName, "..."];
    }),
  };

  return (
    <Box>
      <Heading mb={2}>Players</Heading>
      <Flex>
        {/* <Input placeholder={"Search players..."} /> */}
        <Button onClick={onOpen}>Add Player</Button>
      </Flex>
      <Box p={2} />
      <AppTable contentMap={contentMap} />
      <Modal
        isCentered
        closeOnOverlayClick={true}
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={true}
      >
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>Add Players</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <AddPlayerFields parentCallback={handleNewPlayers} />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" onClick={handleSubmit}>
                Add Players
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default PlayersList;
