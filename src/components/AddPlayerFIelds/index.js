import { SmallCloseIcon } from '@chakra-ui/icons'
import { Input, IconButton } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { capitalizeSingleWord } from '../../util/helper'
import PropTypes, { objectOf } from 'prop-types'

export default function AddPlayerFields ({ parentCallback, selectedPlayer }) {
  const [itemsArray, setItemsArray] = useState([
    selectedPlayer
      ? { ...selectedPlayer }
      : { _id: '', firstName: '', lastName: '' }
  ])

  useEffect(() => {
    // need to update this when sending back multiple players
    parentCallback(...itemsArray)
  }, [itemsArray])

  const handleChange = (index, key, value) => {
    const list = [...itemsArray]
    list[index][key] = capitalizeSingleWord(value)
    setItemsArray(list)
    parentCallback(list)
  }

  const handleDelete = (index) => {
    const list = [...itemsArray]
    list.splice(index, 1)
    setItemsArray(list)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {itemsArray.map((item, index) => {
        return (
          <div style={{ display: 'flex', marginTop: 8 }} key={index}>
            <Input
              mr={2}
              placeholder={`First Name...${index}`}
              value={item.firstName}
              onChange={(e) => {
                handleChange(index, 'firstName', e.target.value)
              }}
              isRequired={true}
              name={`firstName${index}`}
            />
            <Input
              mr={2}
              placeholder={`Last Name...${index}`}
              value={item.lastName}
              onChange={(e) => {
                handleChange(index, 'lastName', e.target.value)
              }}
              isRequired={true}
              name={`lastName${index}`}
            />
            <IconButton
              icon={<SmallCloseIcon />}
              onClick={() => {
                handleDelete(index)
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

AddPlayerFields.propTypes = {
  parentCallback: PropTypes.func,
  selectedPlayer: objectOf(PropTypes.any)
}
