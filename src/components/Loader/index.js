import { Flex } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import React from 'react'

export default function Loader () {
  return <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            style={{ flex: 1, height: '85vh' }}
        >
            <Spinner size="lg"/>
        </Flex>
}
