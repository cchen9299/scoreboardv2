import React from 'react'
import { Box, Flex, Heading, Text, Wrap } from '@chakra-ui/layout'

export default function ModalCard ({ cardTitle, subContent }) {
  return (
    <Box
      p={4}
      mb={2}
      border="1px solid lightgrey"
      borderRadius={8}
    >
      <Heading fontSize='large'>{cardTitle}</Heading>
      <Wrap justifyContent="space-between">
        {subContent.map((item) => {
          const { title, content } = item
          return (
            <Box minWidth={'30%'} key={title} display="flex" flexGrow="1">
              <Flex flexDir="column">
                <Text fontWeight="bold" fontSize="sm" color="grey">
                  {title}
                </Text>
                <Text>{content}</Text>
              </Flex>
            </Box>
          )
        })}
      </Wrap>
    </Box>
  )
}
