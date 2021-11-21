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
  DELETE_ONE_PLAYER,
  DELETE_ONE_GAMERECORD,
  DELETE_ONE_BOARDGAME,
  READ_ALL
} from '../../graphql/operations'

export default function DeleteButton ({ item, type }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  let deleteOperationType
  if (type === 'Player') {
    deleteOperationType = DELETE_ONE_PLAYER
  }
  if (type === 'GameRecord') {
    deleteOperationType = DELETE_ONE_GAMERECORD
  }
  if (type === 'Boardgame') {
    deleteOperationType = DELETE_ONE_BOARDGAME
  }

  const [deleteOneItem, { loading }] = useMutation(
    deleteOperationType,
    { refetchQueries: [READ_ALL] }
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
        closeOnOverlayClick={!loading}
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
            <Button variant="solid" disabled={loading} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              variant="ghost"
              type="submit"
              isLoading={loading}
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
