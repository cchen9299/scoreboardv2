import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Input, IconButton, Flex } from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import PropTypes, { objectOf } from 'prop-types'

export default function AddExpansionField ({ parentCallback, selectedItem }) {
  const [workingExpansionList, setWorkingExpansionsList] = useState(selectedItem.expansionsOwned)

  useEffect(() => {
    parentCallback(workingExpansionList)
  }, [workingExpansionList])

  const handleValueChange = (e, index) => {
    const list = [...workingExpansionList]
    list[index] = e.target.value
    setWorkingExpansionsList(list)
  }

  const handleDelete = (index) => {
    const list = [...workingExpansionList]
    list.splice(index, 1)
    setWorkingExpansionsList(list)
  }

  const handleOnBlur = () => {
    const list = [...workingExpansionList]
    setWorkingExpansionsList(list)
  }

  return (
    <div>
      {workingExpansionList.map((item, index) => {
        return (
          <Flex key={index} mt={2}>
            <Input
              mr={2}
              autoComplete="off"
              isRequired
              placeholder={`Expansion ${index + 1} Name...`}
              value={item}
              onChange={(e) => {
                handleValueChange(e, index)
              }}
              onBlur={(e) => {
                handleOnBlur(e, index)
              }}
              name={`expansion${index}`}
            />
            <IconButton
              onClick={(e) => {
                handleDelete(e, index)
              }}
              icon={<SmallCloseIcon />}
            >
              Delete
            </IconButton>
          </Flex>
        )
      })}
      <AddButton
        onClick={() =>
          setWorkingExpansionsList(() => {
            const list = [...workingExpansionList]
            list.push('')
            setWorkingExpansionsList(list)
          })
        }
      >
        New/Add Expansion
      </AddButton>
    </div>
  )
}

const AddButton = styled.div`
  font-weight: bold;
  cursor: pointer;
  padding: 8px 0;
  color: steelblue;
`
AddExpansionField.propTypes = {
  parentCallback: PropTypes.func,
  selectedItem: objectOf(PropTypes.any)
}
