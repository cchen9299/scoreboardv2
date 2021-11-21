import React, { useEffect } from 'react'
import {
  Box,
  Heading,
  Flex
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { READ_RECORDS } from '../../graphql/operations'
import AppTable from '../../components/AppTable'

function GameRecordList () {
  const { loading, data, refetch } = useQuery(READ_RECORDS)
  useEffect(() => { refetch() }, [])
  if (!data || loading) {
    return null
  }

  const dateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }
  const dateFormat = new Intl.DateTimeFormat('en-US', dateOptions)
  const gameRecords = data.gameRecords
  const contentMap = gameRecords?.map((record) => {
    return {
      originalData: record,
      cardTitle: record.boardgamePlayed.name,
      subContent: [
        // { title: 'Winner', content: '...' },
        {
          title: 'Date',
          content: dateFormat.format(new Date(record.date))
        },
        {
          title: 'Players',
          content: record.players.length
        }
      ]
    }
  })

  return (
    <Box>
      <Heading mb={2}>Game Records</Heading>
      <Flex>{/* <Input placeholder={"Search players..."} /> */}</Flex>
      <Box p={2} />
      <AppTable contentMap={contentMap} type={'GameRecord'} items={gameRecords} hideDelete={true} />
    </Box>
  )
}

export default GameRecordList
