import React from 'react'
import {
  Flex,
  Box,
  Heading
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import {
  READ_BOARDGAMES
} from '../../graphql/operations'
import AppTable from '../../components/AppTable'
import UpsertButton from '../../components/UpsertButton'

function BoardgamesList () {
  const { loading, data } = useQuery(READ_BOARDGAMES)
  const boardgames = data?.boardgames

  if (loading || !data) {
    return null
  }

  return (
    <Box>
      <Heading mb={2}>Boardgames</Heading>
      <Flex >
        <UpsertButton item={{ _id: '', name: '', expansionsOwned: [] }} itemType={'Boardgame'} operationType={'Add'} readOperationType={READ_BOARDGAMES}/>
      </Flex>
      <Box p={2} />
      <AppTable type={'Boardgame'} items={boardgames} readOperationType={READ_BOARDGAMES}/>
    </Box>
  )
}

export default BoardgamesList
