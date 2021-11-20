import React from 'react'
import PropTypes, { objectOf } from 'prop-types'
import {
  IconButton,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { useMutation } from '@apollo/client'
import {
  READ_BOARDGAMES,
  READ_PLAYERS,
  READ_RECORDS,
  DELETE_ONE_PLAYER,
  DELETE_ONE_GAMERECORD,
  DELETE_ONE_BOARDGAME
} from '../../graphql/operations'

export default function DeleteButton ({ item, type }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  let readOperationType
  let deleteOperationType
  if (type === 'Player') {
    deleteOperationType = DELETE_ONE_PLAYER
    readOperationType = READ_PLAYERS
  }
  if (type === 'GameRecord') {
    deleteOperationType = DELETE_ONE_GAMERECORD
    readOperationType = READ_RECORDS
  }
  if (type === 'Boardgame') {
    deleteOperationType = DELETE_ONE_BOARDGAME
    readOperationType = READ_BOARDGAMES
  }

  const [deleteOneItem, { loading: deleting }] = useMutation(
    deleteOperationType,
    { refetchQueries: [readOperationType] }
  )

  const handleDelete = async () => {
    await deleteOneItem({
      variables: {
        id: item._id
      }
    })
  }

  return (
      <>
        <IconButton
          onClick={onOpen}
          icon={<DeleteIcon />}
        />
      <Modal
        isCentered
        closeOnOverlayClick={!deleting}
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={true}
      >
        <ModalOverlay opacity={0.5} />
        <ModalContent m={4}>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Think twice, its gonna be a lotta work if you want to bring this
              back ya know?
            </Text>
            {/* <Text mt={2}>Actually.. lets hear the delete password..</Text>
            <Input
              mt={2}
              type="number"
              onChange={(e) => setDeleteInputValue(e.target.value)}
            /> */}
          </ModalBody>
          <ModalFooter>
            <Button variant="solid" disabled={deleting} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              variant="ghost"
              type="submit"
              isLoading={deleting}
              // deleteInputValue === "8008135" &&
              onClick={() => {
                handleDelete()
                onClose()
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal></>)
}

DeleteButton.propTypes = {
  item: objectOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired
}
