import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes, { arrayOf } from 'prop-types'
import {
  Checkbox,
  Heading,
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
  Box
} from '@chakra-ui/react'
import { SearchIcon, SmallCloseIcon } from '@chakra-ui/icons'

export default function BoardgameForm ({ boardgames, getBoardgameData }) {
  const [filteredBoardgames, setFilteredBoardgames] = useState(boardgames)
  const [showBoardgameSearchResults, setShowBoardgameSearchResults] =
    useState(false)
  const [boardgamePlayed, setBoardgamePlayed] = useState(null)
  const expansionsOwned = boardgamePlayed?.boardgamePlayed?.expansionsOwned
  const [ownedExpansionsPlayed, setOwnedExpansionsPlayed] = useState([])

  useEffect(() => {
    getBoardgameData({
      ...boardgamePlayed,
      expansionsPlayed: [...ownedExpansionsPlayed]
    })
  }, [boardgamePlayed, ownedExpansionsPlayed])

  const handleBoardgameSearchOnChange = (e) => {
    setShowBoardgameSearchResults(true)
    setFilteredBoardgames(
      boardgames.filter((boardgame, index) => {
        return boardgame.name
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase())
      })
    )
  }

  const handleResultOnClick = (boardgame) => {
    setBoardgamePlayed({
      boardgamePlayed: { ...boardgame }
    })
  }

  const handleBoardgameDelete = () => {
    setBoardgamePlayed(null)
  }

  const handleExpansion = (e) => {
    const ownedExpansionsPlayedCopy = [...ownedExpansionsPlayed]
    const expansionName = e.target.value
    const valueIndex = ownedExpansionsPlayedCopy.indexOf(expansionName)
    ownedExpansionsPlayed.includes(expansionName)
      ? ownedExpansionsPlayedCopy.splice(valueIndex, 1)
      : ownedExpansionsPlayedCopy.push(expansionName)
    setOwnedExpansionsPlayed(ownedExpansionsPlayedCopy)
  }

  if (boardgamePlayed !== null) {
    return (
      <Box style={{ maxWidth: 500 }}>
        <SelectedBoardgameContainer>
          <Input
            variant="filled"
            mr={2}
            value={boardgamePlayed?.boardgamePlayed?.name}
            isReadOnly
          />
          <IconButton
            onClick={() => {
              setBoardgamePlayed(null)
              setShowBoardgameSearchResults(false)
              handleBoardgameDelete()
            }}
            icon={<SmallCloseIcon />}
          />
        </SelectedBoardgameContainer>
        <Box p={1} />
        {expansionsOwned.lenth > 0 && <Heading size="sm">Expansions Played</Heading>}
        {expansionsOwned.map((expansion, index) => {
          return (
            <Checkbox
              p={2}
              mt={1}
              key={expansion}
              id={`expansion${index}`}
              type="checkbox"
              value={expansion}
              onChange={handleExpansion}
              style={{
                borderRadius: 8,
                borderWidth: 1,
                borderColor: 'lightGrey',
                width: '100%',
                flex: 1
              }}
            >
              <label htmlFor={`expansion${index}`}>{expansion}</label>
            </Checkbox>
          )
        })}
        {/* <AddExpansionField
          parentCallback={handleNewExpansions}
        /> */}
      </Box>
    )
  } else {
    return (
      <Box style={{ maxWidth: 500 }}>
        <SearchContainer>
          <InputGroup>
            <InputLeftElement><SearchIcon /></InputLeftElement>
            <Input
              autoComplete={'off'}
              placeholder={'Search boardgames...'}
              onChange={(e) => handleBoardgameSearchOnChange(e)}
              onBlur={() => {
                boardgamePlayed && setShowBoardgameSearchResults(false)
              }}
            />
          </InputGroup>
          {showBoardgameSearchResults && (
            <SearchResultsList>
              {filteredBoardgames.map((boardgame, index) => {
                if (index > 3) return null
                return (
                  <Result
                    key={boardgame.name}
                    onClick={() => handleResultOnClick(boardgame)}
                  >
                    {boardgame.name}
                  </Result>
                )
              })}
            </SearchResultsList>
          )}
        </SearchContainer>
      </Box>
    )
  }
}
const SearchContainer = styled.div`
  border: solid 1px lightgrey;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  margin-top: 8px;
`
const SearchResultsList = styled.div`
  z-index: 10;
  background-color: white;
  border-radius: 0 0 8px 8px;
  width: 100%;
`

const Result = styled.div`
  padding: 8px;
  cursor: pointer;
  :hover {
    background-color: lightgrey;
  }
`

const SelectedBoardgameContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
`

BoardgameForm.propTypes = {
  getBoardgameData: PropTypes.func,
  boardgames: arrayOf(PropTypes.any)
}
