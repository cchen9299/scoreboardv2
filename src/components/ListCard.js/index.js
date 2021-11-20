import React from 'react'
import {
  Flex,
  Box,
  Text,
  Wrap
} from '@chakra-ui/react'
import DeleteButton from '../DeleteButton'
import UpsertButton from '../UpsertButton'
import PropTypes, { objectOf } from 'prop-types'

export default function ListCard ({ item, type }) {
  const { cardTitle, subContent, index, originalData } = item
  return (
      <Flex
        key={cardTitle + index}
        flexDir="column"
        minWidth="30%"
        p="2"
        border="1px solid grey"
        mb="2"
      >
        <Text>{cardTitle}</Text>
        <Text>{originalData._id}</Text>
        <Wrap pt="2" pb="2">
          {subContent.map((data) => (
            <Box key={data.title} minWidth="30%">
              <Flex flexDir="column">
                <Text fontSize="sm" color="grey">
                  {data.title}
                </Text>
                <Text>{data.content}</Text>
              </Flex>
            </Box>
          ))}
        </Wrap>
        <Flex mt="2" alignSelf="flex-end">
          {type !== 'GameRecord' && <UpsertButton item={originalData} itemType={type} operationType={'Edit'} />}
          <DeleteButton item={originalData} type={type}/>
        </Flex>
      </Flex>
  )
}

ListCard.propTypes = {
  item: objectOf(PropTypes.any).isRequired,
  type: PropTypes.string
}
