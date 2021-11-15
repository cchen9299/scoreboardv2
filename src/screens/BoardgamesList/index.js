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
  useToast,
  Spinner,
} from "@chakra-ui/react";
import AddExpansionField from "../../components/AddExpansionField";
import { AlertIcon, Alert, AlertDescription } from "@chakra-ui/alert";
import { useQuery, useMutation } from "@apollo/client";
import {
  READ_BOARDGAMES,
  INSERT_ONE_BOARDGAME,
} from "../../graphql/operations";
import AppTable from "../../components/AppTable";

function BoardgamesList() {
  const { loading, data } = useQuery(READ_BOARDGAMES);

  const [insertOneBoardgame, { loading: adding }] = useMutation(
    INSERT_ONE_BOARDGAME,
    {
      refetchQueries: [READ_BOARDGAMES],
    }
  );
  const boardgames = data?.boardgames;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [newBoardgameName, setNewBoardgameName] = useState("");
  const [newExpansions, setNewExpansions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const contentMap = {
    headerContent: ["Name", "Games Played", "Last Played"],
    bodyContent: boardgames?.map((boardgame) => {
      return [boardgame.name, "...", "..."];
    }),
  };

  const handleNewBoardgameName = (e) => {
    setNewBoardgameName(e.target.value);
  };

  const handleBoardgameSubmit = async (e) => {
    e.preventDefault();
    const hasDuplicateBoardgame = boardgames.some((boardgame) => {
      return boardgame.name === newBoardgameName;
    });
    const dupeNewExpansions = newExpansions.filter((expansion, index) => {
      return newExpansions.indexOf(expansion) !== index;
    });
    const hasDupeExpansions = dupeNewExpansions.length > 0;

    if (hasDuplicateBoardgame) {
      setErrorMessage("already got this game");
      return;
    }
    if (hasDupeExpansions) {
      setErrorMessage(
        `duped expansion(s): ${dupeNewExpansions.map((expansion) => expansion)}`
      );
    }

    await insertOneBoardgame({
      variables: {
        data: {
          name: newBoardgameName,
          expansionsOwned: newExpansions,
        },
      },
    })
      .then(() =>
        toast({
          position: "bottom",
          render: () => (
            <Box color="white" p={3} bg="green.500">
              Success!
            </Box>
          ),
        })
      )
      .catch((error) => {
        toast({
          position: "bottom",
          render: () => (
            <Box color="white" p={3} bg="red.500">
              {error}
            </Box>
          ),
        });
      });
  };

  if (loading || !data) {
    return null;
  }

  // TODO: query games played 1
  // TODO: query last played 3
  // TODO: write update logic 7
  // TODO: write delete logic 3

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
          <form onSubmit={(e) => handleBoardgameSubmit(e)}>
            <ModalHeader>Add Boardgame</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder="Boardgame Name"
                onChange={(e) => handleNewBoardgameName(e)}
                isRequired
              />
              <AddExpansionField
                parentCallback={(data) => setNewExpansions([...data])}
              />
              {errorMessage && (
                <Alert status={"error"} mt={2}>
                  <AlertIcon />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="yellow"
                variant={"solid"}
                type="submit"
                disabled={adding}
                width="100%"
                maxW="500px"
              >
                {adding ? <Spinner /> : "Add Boardgame"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default BoardgamesList;
