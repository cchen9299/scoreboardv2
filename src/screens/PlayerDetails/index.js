import { useQuery } from '@apollo/client'
import {
  Flex,
  Box,
  Text,
  Heading
} from '@chakra-ui/react'
import React from 'react'
import { useLocation } from 'react-router'
import { READ_PLAYER_RECORDS } from '../../graphql/operations'

function PlayerDetails () {
  const location = useLocation()
  const currentId = location.pathname.split('/playersList/').pop('')
  const { loading, data } = useQuery(READ_PLAYER_RECORDS, { variables: { _id: currentId } })

  if (loading || !data) {
    return null
  }
  const { gameRecords, player } = data
  // boardgames played

  // create list of unique boardgames played
  gameRecords.forEach((record, index) => {
    const test = record.indexOf(record.boardgamePlayed._id) === index
    console.log(test)
  })

  // win rate, high score, avg score
  return (
    <Box>
      <Heading>{player.firstName} {player.lastName}</Heading>
      <Text as="kbd" fontSize="xs">{player._id}</Text>
    </Box>
  )
}

export default PlayerDetails
