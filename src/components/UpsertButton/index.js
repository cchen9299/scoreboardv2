import React, { useState } from 'react'
import PropTypes, { objectOf } from 'prop-types'
import {
  Box,
  IconButton,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Alert,
  AlertIcon,
  AlertDescription,
  Input,
  useDisclosure
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { useMutation } from '@apollo/client'
import {
  READ_ALL,
  UPSERT_ONE_PLAYER,
  UPSERT_ONE_BOARDGAME
} from '../../graphql/operations'
import AddPlayerFields from '../AddPlayerFIelds'
import AddExpansionField from '../AddExpansionField'
import { Types } from 'mongoose'

export default function UpsertButton ({ item, itemType, operationType }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [upsertingItem, setUpsertingItem] = useState(item)
  // const [workingItem, setWorkingItem] = useState(item.originalData)
  const [errorMessage, setErrorMessage] = useState('')
  const toast = useToast()

  let upsertOperationType
  let dataMap
  let content
  const newObjectId = new Types.ObjectId()

  if (itemType === 'Player') {
    upsertOperationType = UPSERT_ONE_PLAYER
    dataMap = {
      _id: upsertingItem?._id || newObjectId,
      firstName: upsertingItem?.firstName,
      lastName: upsertingItem?.lastName
    }
    content = <AddPlayerFields
      selectedPlayer={item}
      parentCallback={(newPlayers) => setUpsertingItem(newPlayers)}
    />
  }
  // if (itemType === 'GameRecord') {
  //   upsertOperationType = UPSERT_ONE_GAMERECORD
  //   readOperationType = READ_RECORDS
  //   dataMap = {
  //     _id: upsertingItem._id || newObjectId,
  //     boardgamePlayed: upsertingItem.boardgamePlayed,
  //     expansionsPlayed: [...upsertingItem.expansionsPlayed],
  //     players: [...upsertingItem.players],
  //     date: upsertingItem.date
  //   }
  // }
  if (itemType === 'Boardgame') {
    upsertOperationType = UPSERT_ONE_BOARDGAME
    dataMap = {
      _id: upsertingItem?._id || newObjectId,
      name: upsertingItem?.name,
      expansionsOwned: upsertingItem?.expansionsOwned
    }
    content =
    <>
      <Input
        placeholder="Boardgame Name"
        onChange={(e) => {
          const upsertingItemCopy = { ...upsertingItem, name: e.target.value }
          setUpsertingItem(upsertingItemCopy)
        }}
        isRequired
        value={upsertingItem?.name}
      />
      <AddExpansionField
        selectedItem={upsertingItem}
        parentCallback={(data) => {
          const upsertingItemCopy = { ...upsertingItem, expansionsOwned: [...data] }
          setUpsertingItem(upsertingItemCopy)
        }}
      />
    </>
  }

  const [upsertOneEntry, { loading: upserting }] = useMutation(
    upsertOperationType, { refetchQueries: [READ_ALL] }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    // should handle validation base on type

    // const hasDuplicates = players.some((player) =>
    //   newPlayers.some((newPlayer) => {
    //     return (
    //       newPlayer.firstName === player.firstName &&
    //       newPlayer.lastName === player.lastName
    //     )
    //   })
    // )
    // if (hasDuplicates) {
    //   setErrorMessage('does someone really have the same first/last name??')
    //   return
    // }

    // const hasDuplicateBoardgame = boardgames.some((boardgame) => {
    //   return boardgame.name === newBoardgameName;
    // });
    // const dupeNewExpansions = newExpansions.filter((expansion, index) => {
    //   return newExpansions.indexOf(expansion) !== index;
    // });
    // const hasDupeExpansions = dupeNewExpansions.length > 0;

    // if (hasDuplicateBoardgame) {
    //   setErrorMessage("already got this game");
    //   return;
    // }
    // if (hasDupeExpansions) {
    //   setErrorMessage(
    //     `duped expansion(s): ${dupeNewExpansions.map((expansion) => expansion)}`
    //   );
    // }

    setErrorMessage('')
    await upsertOneEntry({
      variables: {
        ...dataMap
      }
    }).then(() =>
      toast({
        position: 'bottom',
        render: () => (
          <Box color="white" p={3} bg="green.500">
            Success!
          </Box>
        )
      })
    )
  }
  return (
    <>
      {operationType === 'Add'
        ? <Button onClick={onOpen}>Add {itemType}</Button>
        : <IconButton mr="2" icon={<EditIcon />} onClick={onOpen} />
      }
      <Modal
        isCentered
        closeOnOverlayClick={true}
        isOpen={isOpen}
        onClose={() => {
          setUpsertingItem(item)
          onClose()
        }}
        blockScrollOnMount={true}
      >
        <ModalOverlay />
        <ModalContent m={4}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <ModalHeader>{operationType} {itemType}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {content}
              {errorMessage && (
                <Alert status={'error'} mt={2}>
                  <AlertIcon />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="yellow"
                variant={'solid'}
                type="submit"
                disabled={upserting}
                width="100%"
                maxW="500px"
                isLoading={upserting}
              >{`${operationType} ${itemType}`}</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

UpsertButton.propTypes = {
  item: objectOf(PropTypes.any),
  itemType: PropTypes.string.isRequired,
  operationType: PropTypes.string.isRequired
}
