import { useQuery } from '@apollo/client'
import { Flex, Box, Text, Heading } from '@chakra-ui/react'
import React from 'react'
import { useLocation } from 'react-router'
import Loader from '../../components/Loader'
import ModalCard from '../../components/ModalCard'
import { READ_PLAYER_RECORDS } from '../../graphql/operations'

function PlayerDetails () {
  const location = useLocation()
  const currentId = location.pathname.split('/playerList/').pop('')
  const { loading, data } = useQuery(READ_PLAYER_RECORDS, {
    variables: { _id: currentId }
  })

  if (loading || !data) {
    return <Loader />
  }
  const { player } = data
  const gameRecords = [...data.gameRecords]

  gameRecords.sort((a, b) => {
    return a.boardgamePlayed.name > b.boardgamePlayed.name ? 1 : -1
  })

  const gameRecordsByBoardgame = [[]]
  gameRecords.forEach((record, index) => {
    gameRecordsByBoardgame[gameRecordsByBoardgame.length - 1].push(record)
    gameRecords[index + 1] &&
      record.boardgamePlayed.name !==
        gameRecords[index + 1].boardgamePlayed.name &&
      gameRecordsByBoardgame.push([])
  })

  const dateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }
  const dateFormat = new Intl.DateTimeFormat('en-US', dateOptions)

  const findByKeyValue = (value, key, object) => {
    return object[object.findIndex((obj) => obj[key] === value)]
  }

  return (
    <Box>
      <Heading>
        {player.firstName} {player.lastName}
      </Heading>
      <Text as="kbd" fontSize="xs">
        {player._id}
      </Text>
      <Heading fontSize="lg" mt={8} mb={2}>
        Boardgames Played
      </Heading>
      {gameRecordsByBoardgame.map((recordGroup, index) => {
        const { _id, name } = recordGroup[index].boardgamePlayed
        let avgScore = 0
        let highScore = 0
        recordGroup.forEach((record) => {
          const myRecord = findByKeyValue(player._id, '_id', record.players)
          const myScore = parseInt(myRecord.score)
          avgScore = avgScore + myScore
          highScore = myScore > highScore ? myScore : highScore
        })
        avgScore = Math.round(avgScore / recordGroup.length * 10) / 10

        const subContent = [
          { title: 'Times Played', content: recordGroup.length },
          { title: 'High Score', content: avgScore },
          { title: 'Avg Score', content: highScore },
          { title: 'Last Played', content: dateFormat.format(new Date(recordGroup[0].date)) }
        ]
        return <ModalCard key={_id} subContent={subContent} cardTitle={name} />
      })}
    </Box>
  )
}

export default PlayerDetails
