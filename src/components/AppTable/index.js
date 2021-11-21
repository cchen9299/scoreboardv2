import React, { useEffect, useState } from 'react'
import PropTypes, { arrayOf } from 'prop-types'
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button
} from '@chakra-ui/react'
import ListCard from '../ListCard.js'
import { SearchIcon } from '@chakra-ui/icons'

// AppTable handles list filtering
export default function AppTable ({
  contentMap,
  type
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredList, setFilteredList] = useState(contentMap)
  const handleOnChange = (e) => {
    setSearchTerm(e.target.value)
  }
  useEffect(() => {
    setFilteredList(contentMap.filter((listItem) => {
      return listItem.cardTitle.toLowerCase().includes(searchTerm.toLowerCase())
    }))
  }, [contentMap, searchTerm])

  return (
    <Box width="100%">
      <InputGroup mb={4}>
          <InputLeftElement><SearchIcon /></InputLeftElement>
          <Input
            autoComplete="off"
            placeholder={'Search...'}
            onChange={(e) => handleOnChange(e)}
            value={searchTerm}
          />
          {searchTerm &&
              <InputRightElement width={75}>
                  <Button
                      variant="ghost"
                      colorScheme="blue"
                      size="xs"
                      onClick={() => setSearchTerm('')}
                  >
                      CLEAR
                  </Button>
              </InputRightElement>
          }
      </InputGroup>
      {filteredList.map((item) => {
        return <ListCard item={item} type={type} key={item.originalData._id} />
      })}
    </Box>
  )
}

AppTable.propTypes = {
  contentMap: arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired
}
