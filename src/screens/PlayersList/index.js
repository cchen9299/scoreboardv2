import React from 'react'
import {
  Box,
  Flex,
  Heading
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { READ_PLAYERS } from '../../graphql/operations'
import UpsertButton from '../../components/UpsertButton'
import AppTable from '../../components/AppTable'

function PlayersList () {
  const { loading, data } = useQuery(READ_PLAYERS)

  let players
  if (!loading && data) {
    players = data.players
  } else return null

  return (
    <Box>
      <Heading mb={2}>Players</Heading>
      <Flex>
        <UpsertButton itemType={'Player'} operationType={'Add'} readOperationType={READ_PLAYERS}/>
      </Flex>
      <Box p={2} />
      <AppTable
        type={'Player'}
        items={players}
        readOperationType={READ_PLAYERS}
      />
    </Box>
  )
}

export default PlayersList
