import { SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

export default function PlayersForm({
  globalPlayersList,
  getPlayersData,
  inputError,
}) {
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [showPlayerSearchResults, setShowPlayerSearchResults] = useState(false);

  const [players, setPlayers] = useState([]);

  // getPlayersData([...list]);

  useEffect(() => {
    getPlayersData(players);
  }, [players]);

  const handlePlayerSearchOnChange = (e) => {
    setShowPlayerSearchResults(true);
    setFilteredPlayers(
      globalPlayersList.filter((player) => {
        return player.firstName
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      })
    );
  };

  const handleOnBlur = () => {
    document.addEventListener("click", (documentEvent) => {
      documentEvent.target.parentElement?.id !== "searchResultsList" &&
        setShowPlayerSearchResults(false);
    });
  };

  const handleResultOnClick = (player) => {
    const list = [...players];
    list.includes(player) === false && list.push({ ...player, score: "" });
    setPlayers(list);
    setShowPlayerSearchResults(false);
  };

  const handleSelectedPlayerChange = (index, value) => {
    const list = [...players];
    list[index].score = value;
    setPlayers(list);
  };

  const handleRemovePlayer = (index) => {
    const list = [...players];
    list.splice(index, 1);
    setPlayers(list);
  };

  return (
    <Box style={{ maxWidth: 500 }}>
      <SearchContainer>
        <Flex>
          <InputGroup>
            <InputLeftElement children={<SearchIcon />} />
            <Input
              autoComplete="off"
              placeholder={"Search players..."}
              onChange={handlePlayerSearchOnChange}
              onBlurCapture={handleOnBlur}
            />
          </InputGroup>
        </Flex>
        {showPlayerSearchResults && (
          <SearchResultsList id={"searchResultsList"}>
            {filteredPlayers.map((player) => {
              return (
                <Result
                  key={player._id}
                  onClick={() => handleResultOnClick(player)}
                >
                  {player.firstName} {player.lastName}
                </Result>
              );
            })}
          </SearchResultsList>
        )}
      </SearchContainer>
      <div>
        {players?.map((player, index) => {
          return (
            <div key={player._id} style={{ display: "flex", marginTop: 8 }}>
              <Input
                isTruncated
                variant="filled"
                mr={2}
                value={player.firstName + " " + player.lastName}
                isReadOnly
              />
              <Input
                mr={2}
                autoComplete="off"
                isRequired
                placeholder="Score"
                type="number"
                onChange={(e) => {
                  handleSelectedPlayerChange(index, e.target.value);
                }}
              />
              <IconButton
                icon={<SmallCloseIcon />}
                children={"Remove"}
                onClick={() => {
                  handleRemovePlayer(index);
                }}
              />
            </div>
          );
        })}
      </div>
    </Box>
  );
}

const SearchContainer = styled.div`
  border: solid 1px lightgrey;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  margin-top: 8px;
`;
const SearchResultsList = styled.div`
  z-index: 10;
  background-color: white;
  border-radius: 0 0 8px 8px;
  width: 100%;
`;

const Result = styled.div`
  padding: 8px;
  cursor: pointer;
  :hover {
    background-color: lightgrey;
  }
`;
