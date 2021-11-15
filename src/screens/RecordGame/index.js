import React, { useState } from "react";
import BoardgameForm from "./components/BoardgameForm";
import PlayersForm from "./components/PlayersForm";
import {
  Button,
  Spinner,
  Box,
  useToast,
  Flex,
  Heading,
  Text,
  Input,
} from "@chakra-ui/react";
import { useQuery, useMutation } from "@apollo/client";
import dotenv from "dotenv";
import { READ_ALL, INSERT_RECORD } from "../../graphql/operations";

function RecordGame() {
  const { loading, data } = useQuery(READ_ALL);
  const [insertRecord, { loading: adding }] = useMutation(INSERT_RECORD);
  const toast = useToast();
  let boardgames, players;

  if (!loading && data) {
    boardgames = data.boardgames;
    players = data.players;
  }

  const showDataDoubleCheck = true;

  const [gameRecordBoardgameData, setGameRecordBoardgameData] = useState(null);
  const [gameRecordPlayersData, setGameRecordPlayersData] = useState(null);
  const [providedPassword, setProvidedPassword] = useState("");
  const [inputError, setInputError] = useState(null);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const boardgamePlayed = gameRecordBoardgameData.boardgamePlayed;
    if (boardgamePlayed === undefined) {
      setInputError("i don't see a boardgame played");
      return;
    }
    if (gameRecordPlayersData.length > 1) {
      setInputError(
        "unless fred played alone and didn't count himself as a player, i need players"
      );
      return;
    }
    if (providedPassword !== "8008") {
      setInputError("are you too drunk to have the right password?");
      return;
    }
    setInputError(null);
    await insertRecord({
      variables: {
        data: {
          boardgamePlayed: {
            _id: boardgamePlayed._id,
            name: boardgamePlayed.name,
          },
          expansionsPlayed: gameRecordBoardgameData.expansionsPlayed,
          players: gameRecordPlayersData,
          date: new Date(),
        },
      },
    })
      .then(
        toast({
          position: "bottom-left",
          render: () => (
            <Box color="white" p={3} bg="green.500">
              Success!
            </Box>
          ),
        })
      )
      .catch((error) => {
        toast({
          position: "bottom-left",
          render: () => (
            <Box color="white" p={3} bg="red.500">
              {error}
            </Box>
          ),
        });
      });
  };

  if (!data || loading) {
    return null;
  }

  return (
    <Flex direction={"column"}>
      <Heading size="lg">Record Game</Heading>
      <Box pt={2} />
      <form
        name={"gameRecordForm"}
        onSubmit={(e) => {
          handleOnSubmit(e);
        }}
      >
        <Heading size="sm">Boardgame</Heading>
        <BoardgameForm
          boardgames={boardgames}
          getBoardgameData={(data) => {
            setGameRecordBoardgameData(data);
          }}
        />
        <Box p={2} />
        <Heading size="sm">Players</Heading>
        <PlayersForm
          globalPlayersList={players}
          getPlayersData={(data) => {
            setGameRecordPlayersData(data);
          }}
        />
        <Box p={2} />
        <Heading size="sm">Secret Password</Heading>
        <Input
          onChange={(e) => setProvidedPassword(e.target.value)}
          mt={2}
        ></Input>
        <Box p={2} />
        <Button
          colorScheme="yellow"
          variant={"solid"}
          type="submit"
          disabled={adding}
          width="100%"
          maxW="500px"
        >
          {adding ? <Spinner /> : "Off to the data base you go"}
        </Button>
        {inputError && (
          <Text
            maxW="500px"
            bg="red.100"
            p={2}
            mt={2}
            borderRadius="base"
            color="red.500"
          >
            {inputError}
          </Text>
        )}
      </form>
      {showDataDoubleCheck && (
        <div style={{ minHeight: 100 }}>
          <br />
          <br />
          <Heading size="sm">Double Check My Data...</Heading>
          <div>
            {gameRecordBoardgameData?.boardgamePlayed?.name}
            {gameRecordBoardgameData?.expansionsPlayed?.map((expansion) => {
              return <div key={expansion}>{expansion}</div>;
            })}
          </div>
          {gameRecordPlayersData?.map((player, index) => {
            return (
              <div key={index} style={{ display: "flex" }}>
                {player.firstName} {player.lastName} {player.score}
              </div>
            );
          })}
        </div>
      )}
    </Flex>
  );
}

export default RecordGame;
