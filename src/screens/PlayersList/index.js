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
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { AlertIcon, Alert, AlertDescription } from "@chakra-ui/alert";
import AddPlayerFields from "../../components/AddPlayerFIelds";
import { useQuery, useMutation } from "@apollo/client";
import { READ_ALL, INSERT_ONE_PLAYER } from "../../graphql/operations";
import AppTable from "../../components/AppTable";

function PlayersList() {
  const { loading, data } = useQuery(READ_ALL);
  const [insertOnePlayer, { loading: adding }] = useMutation(
    INSERT_ONE_PLAYER,
    {
      refetchQueries: [READ_ALL],
    }
  );
  let players, gameRecords;

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newPlayers, setNewPlayers] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const contentMap = {
    headerContent: ["First Name", "Last Name", "Games Played"],
    bodyContent: players?.map((player) => {
      return [player.firstName, player.lastName, "..."];
    }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasDuplicates = players.some((player) =>
      newPlayers.some((newPlayer) => {
        return (
          newPlayer.firstName === player.firstName &&
          newPlayer.lastName === player.lastName
        );
      })
    );
    // need to check for dupe within the new list when added that function
    if (hasDuplicates) {
      setErrorMessage("does someone really have the same first/last name??");
      return;
    }
    setErrorMessage("");

    await insertOnePlayer({
      variables: {
        data: {
          // array depiction needs to be updated when inserting many
          firstName: newPlayers[0].firstName,
          lastName: newPlayers[0].lastName,
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

  // TODO: query games played 3
  // TODO: write delete logic 3

  // TODO: write update logic 5
  // first decide how update is carried out in UI
  // then probably enable an edit mode
  // send off the update
  // worry about exit paths
  // worry about dupes/invalid entries

  // form validation: check input value type, check with existing data, check for dupe in DB

  if (!loading && data) {
    players = data.players;
    gameRecords = data.gameRecords;
  } else return null;

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
          <form onSubmit={(e) => handleSubmit(e)}>
            <ModalHeader>Add Players</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <AddPlayerFields
                parentCallback={(data) => setNewPlayers([...data])}
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
                {adding ? <Spinner /> : "Add Player(s)"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default PlayersList;
