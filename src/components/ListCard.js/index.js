import React from 'react'
import {
  Flex,
  Box,
  Text,
  Wrap,
  Heading,
  useToken
} from '@chakra-ui/react'
import DeleteButton from '../DeleteButton'
import UpsertButton from '../UpsertButton'
import PropTypes, { objectOf } from 'prop-types'
import { Link } from 'react-router-dom'

export default function ListCard ({ item, type }) {
  const { cardTitle, subContent, index, originalData } = item
  const [gray, blue] = useToken('colors', ['gray.200', 'blue.700'])
  return (
      <Flex
        key={cardTitle + index}
        flexDir="column"
        minWidth="30%"
        pt="3"
        pb="3"
        pl="4"
        pr="4"
        border={`1px solid ${gray}`}
        borderRadius={8}
        mb="2"
      >
        <Link to={`/playersList/${originalData._id}`}>
           <Heading size="md" color={blue}>{cardTitle}</Heading>
        </Link>
        <Text as="kbd" fontSize="xs">{originalData._id}</Text>
        <Wrap pt="2" justifyContent="space-between">
          {subContent.map((data) => (
            <Box key={data.title} minWidth="30%" display="flex" flexGrow="1">
              <Flex flexDir="column">
                <Text fontWeight="bold" fontSize="sm" color="grey">
                  {data.title}
                </Text>
                <Box>{data.content}</Box>
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
