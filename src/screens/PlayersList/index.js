import React from 'react'
import {
  Box,
  Flex,
  Heading
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { READ_ALL } from '../../graphql/operations'
import UpsertButton from '../../components/UpsertButton'
import AppTable from '../../components/AppTable'

function PlayersList () {
  const { loading, data } = useQuery(READ_ALL)
  if (loading || !data) {
    return null
  }
  const players = data.players
  const gameRecords = data.gameRecords

  const contentMap = players.map((player) => {
    const playerRecord = gameRecords.filter((gameRecord) => {
      return gameRecord.players.some((gamePlayer) => {
        return gamePlayer._id === player._id
      })
    })
    console.log(playerRecord)

    return {
      originalData: player,
      cardTitle: `${player.firstName} ${player.lastName}`,
      subContent: [{ title: 'Games Played', content: playerRecord.length }]
    }
  })

  return (
    <Box>
      <Heading mb={2}>Players</Heading>
      <Flex>
        <UpsertButton itemType={'Player'} operationType={'Add'} />
      </Flex>
      <Box p={2} />
      <AppTable
        contentMap={contentMap}
        type={'Player'}
        items={players}
      />
    </Box>
  )
}

export default PlayersList
