import React from 'react'
import PropTypes, { arrayOf, objectOf } from 'prop-types'
import {
  Box
} from '@chakra-ui/react'
import ListCard from '../ListCard.js'

// App table handles shaping different lists into consumable map
export default function AppTable ({
  contentMap,
  type,
  readOperationType,
  items
}) {
  return (
    <Box width="100%">
      {contentMap.map((item) => {
        return <ListCard item={item} type={type} key={item.originalData._id} readOperationType={readOperationType}/>
      })}
    </Box>
  )
}

AppTable.propTypes = {
  contentMap: arrayOf(PropTypes.object).isRequired,
  items: arrayOf(PropTypes.object).isRequired,
  readOperationType: objectOf(PropTypes.any),
  type: PropTypes.string.isRequired
}
