import React from 'react'
import {
  Box,
  Heading,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { READ_RECORDS } from '../../graphql/operations'
import AppTable from '../../components/AppTable'

function PlayersList () {
  const { loading, data } = useQuery(READ_RECORDS)
  const gameRecords = data?.gameRecords
  const { isOpen, onClose } = useDisclosure()

  if (!data || loading) {
    return null
  }

  return (
    <Box>
      <Heading mb={2}>Game Records</Heading>
      <Flex>{/* <Input placeholder={"Search players..."} /> */}</Flex>
      <Box p={2} />
      <AppTable type={'GameRecord'} items={gameRecords} hideDelete={true} />
      <Modal
        isCentered
        closeOnOverlayClick={true}
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={true}
      >
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody></ModalBody>
            <ModalFooter></ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default PlayersList
