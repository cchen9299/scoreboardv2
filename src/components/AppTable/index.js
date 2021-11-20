import React from 'react'
import PropTypes, { arrayOf, objectOf } from 'prop-types'
import {
  Box
} from '@chakra-ui/react'
import ListCard from '../ListCard.js'

// App table handles shaping different lists into consumable map
export default function AppTable ({
  type,
  readOperationType,
  items
}) {
  const dateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }
  const dateFormat = new Intl.DateTimeFormat('en-US', dateOptions)

  let contentMap
  if (type === 'Player') {
    contentMap = items.map((player) => {
      return {
        originalData: player,
        cardTitle: `${player.firstName} ${player.lastName}`,
        subContent: [{ title: 'Games Played', content: '...' }]
      }
    })
  }
  if (type === 'GameRecord') {
    contentMap = items?.map((record) => {
      return {
        originalData: record,
        cardTitle: record.boardgamePlayed.name,
        subContent: [
          { title: 'Winner', content: '...' },
          {
            title: 'Date',
            content: dateFormat.format(new Date(record.date))
          },
          {
            title: 'Players',
            content: '...'
          }
        ]
      }
    })
  }
  if (type === 'Boardgame') {
    contentMap = items?.map((boardgame) => {
      return {
        originalData: boardgame,
        cardTitle: boardgame.name,
        subContent: [
          { title: 'Expansions', content: boardgame.expansionsOwned?.length },
          {
            title: 'Last Played',
            content: '...'
            // content: dateFormat.format(new Date(record.date)),
          }
          // { title: 'Times Played', content: '...' },
        ]
      }
    })
  }

  return (
    <Box width="100%">
      {contentMap.map((item) => {
        return <ListCard item={item} type={type} key={item.originalData._id} readOperationType={readOperationType}/>
      })}
    </Box>
  )
}

AppTable.propTypes = {
  items: arrayOf(PropTypes.object).isRequired,
  readOperationType: objectOf(PropTypes.any),
  type: PropTypes.string.isRequired
}
