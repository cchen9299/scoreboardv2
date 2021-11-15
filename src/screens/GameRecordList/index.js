import React, { useState } from "react";
import {
  Box,
  Heading,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { READ_RECORDS } from "../../graphql/operations";
import AppTable from "../../components/AppTable";

function PlayersList() {
  const { loading, data } = useQuery(READ_RECORDS);
  const gameRecords = data?.gameRecords;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    // if (newPlayers === null) {
    //   return;
    // }
    // const data = [...newPlayers];
    // onClose();
  };

  const dateOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const dateFormat = new Intl.DateTimeFormat("en-US", dateOptions);

  const contentMap = {
    headerContent: ["Game", "Players", "Winner", "Date"],
    bodyContent: gameRecords?.map((record) => {
      return [
        record.boardgamePlayed.name,
        record.players.length,
        "...",
        dateFormat.format(new Date(record.date)),
      ];
    }),
  };
  if (!data || loading) {
    return null;
  }

  return (
    <Box>
      <Heading mb={2}>Game Records</Heading>
      <Flex>{/* <Input placeholder={"Search players..."} /> */}</Flex>
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
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody></ModalBody>
            <ModalFooter></ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default PlayersList;
