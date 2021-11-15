import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
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
import AddExpansionField from "../../components/AddExpansionField";
import { useQuery } from "@apollo/client";
import { READ_BOARDGAMES } from "../../graphql/operations";
import AppTable from "../../components/AppTable";

function BoardgamesList() {
  const { loading, data } = useQuery(READ_BOARDGAMES);
  const boardgames = data?.boardgames;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newBoardgame, setNewBoardgame] = useState(null);
  const [newExpansions, setNewExpansions] = useState([]);

  const handleBoardgameSubmit = () => {
    // const data = {
    //   name: newBoardgame.name,
    //   expansionsOwned: [...newExpansions],
    // };
    // onClose();
  };

  const handleNewExpansions = (newExpansions) => {
    // setNewExpansions([...newExpansions]);
  };

  const handleNewBoardgameName = (e) => {
    // const item = { name: e.target.value };
    // setNewBoardgame(item);
  };

  if (loading || !data) {
    return null;
  }

  const contentMap = {
    headerContent: ["Name", "Games Played", "Last Played"],
    bodyContent: boardgames.map((boardgame) => {
      return [boardgame.name, "...", "..."];
    }),
  };

  return (
    <Box>
      <Heading mb={2}>Boardgames</Heading>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* <Input placeholder={"I don't work yet..."} /> */}
        <Button onClick={onOpen}>Add Boradgame</Button>
      </div>
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
            <ModalHeader>Add Boardgame</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder="Boardgame Name"
                onChange={(e) => handleNewBoardgameName(e)}
              />
              <AddExpansionField parentCallback={handleNewExpansions} />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" onClick={handleBoardgameSubmit}>
                Add Boardgame
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default BoardgamesList;
