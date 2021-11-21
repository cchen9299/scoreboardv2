import React from 'react'
import {
  Flex,
  Box,
  Text,
  Heading
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import {
  READ_ALL
} from '../../graphql/operations'
import AppTable from '../../components/AppTable'
import UpsertButton from '../../components/UpsertButton'

function BoardgamesList () {
  const { loading, data } = useQuery(READ_ALL)
  if (loading || !data) {
    return null
  }

  const boardgames = data.boardgames
  const gameRecords = data.gameRecords

  const dateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }
  const dateFormat = new Intl.DateTimeFormat('en-US', dateOptions)

  const contentMap = boardgames?.map((boardgame) => {
    const boardgameRecord = gameRecords.filter((gameRecord) => {
      return gameRecord.boardgamePlayed._id === boardgame._id
    })

    return {
      originalData: boardgame,
      cardTitle: boardgame.name,
      subContent: [
        { title: 'Times Played', content: boardgameRecord.length },
        {
          title: 'Last Played',
          content: boardgameRecord[0]?.date ? dateFormat.format(new Date(boardgameRecord[0].date)) : '¯\\_(ツ)_/¯'
        },
        {
          title: 'Expansions Owned',
          content:
          boardgame.expansionsOwned.length > 0
            ? <Flex>
            {boardgame.expansionsOwned.map((expansion, index) => {
              return <Text key={expansion}>{index !== 0 && ', '}{expansion}</Text>
            })}
          </Flex>
            : '¯\\_(ツ)_/¯'
        }

      ]
    }
  })

  return (
    <Box>
      <Heading mb={2}>Boardgames</Heading>
      <Flex >
        <UpsertButton item={{ _id: '', name: '', expansionsOwned: [] }} itemType={'Boardgame'} operationType={'Add'} />
      </Flex>
      <Box p={2} />
      <AppTable contentMap={contentMap} type={'Boardgame'} items={boardgames} />
    </Box>
  )
}

export default BoardgamesList
