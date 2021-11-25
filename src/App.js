import React from 'react'
import { Switch, Route, Link, useLocation } from 'react-router-dom'

import {
  Button,
  Flex,
  Container,
  Box,
  IconButton,
  Collapse,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { SmallCloseIcon, HamburgerIcon } from '@chakra-ui/icons'

import BoardgamesList from './screens/BoardgamesList'
import RecordGame from './screens/RecordGame'
import PlayersList from './screens/PlayersList'
import GameRecordList from './screens/GameRecordList'
import PlayerDetails from './screens/PlayerDetails'
import BoardgameDetails from './screens/BoardgameDetails'
import GameRecordDetails from './screens/GameRecordDetails'

function App () {
  const currentLocation = useLocation().pathname
  const { isOpen, onToggle } = useDisclosure()

  const linkMap = [
    {
      path: '/',
      linkName: 'Record'
    },
    {
      path: '/boardgameList',
      linkName: 'Boardgames'
    },
    {
      path: '/playerList',
      linkName: 'Players'
    },
    {
      path: '/gameRecordList',
      linkName: 'History'
    }
  ]

  return (
    <Flex direction={'column'} style={{ height: '100vh' }}>
      <Flex bg={'blue.100'} style={{ position: 'sticky', top: 0, width: '100%', zIndex: 999 }}>
        <Container maxW="container.xl" pt={2} pb={2}>
          {/* desktop nav */}
          <Box
            display={{ base: 'none', md: 'flex' }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex>
              {linkMap.map((link) => {
                return (
                  <Link to={link.path} key={link.linkName}>
                    <Button
                      colorScheme="blue"
                      variant={
                        currentLocation === link.path ? 'solid' : 'ghost'
                      }
                    >
                      {link.linkName}
                    </Button>
                  </Link>
                )
              })}
            </Flex>
            <Link to={'/'}>
              <Text color="blue.700" fontSize="xl" fontWeight="black">
                SCOREBOARD
                <Text color="gray.500" fontSize="xs" as="kbd" >
                  {' '}v0.2.3
                </Text>
              </Text>
            </Link>
          </Box>

          {/* mobile nav */}
          <Flex display={{ base: 'flex', md: 'none' }} flexDirection="column">
            <Flex alignItems="center" justifyContent="space-between">
              <Link to={'/'}>
                <Text color="blue.700" fontSize="xl" fontWeight="black">
                  SCOREBOARD
                  <Text color="gray.500" fontSize="xs" as="kbd" >
                    {' '}v0.2.3
                  </Text>
                </Text>
              </Link>
              <IconButton
                onClick={onToggle}
                icon={isOpen ? <SmallCloseIcon /> : <HamburgerIcon />}
                mb={2}
              />
            </Flex>
            <Collapse in={isOpen} animateOpacity>
              <Stack>
                {linkMap.map((link) => {
                  return (
                    <Link
                      to={link.path}
                      key={link.linkName}
                      style={{
                        display: 'flex',
                        backgroundColor:
                          currentLocation === link.path
                            ? 'rgba(255,255,255,0.5)'
                            : null,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onClick={onToggle}
                    >
                      <Text color="blue.500" fontWeight="bold">
                        {link.linkName}
                      </Text>
                    </Link>
                  )
                })}
              </Stack>
            </Collapse>
          </Flex>
        </Container>
      </Flex>

      <Container maxW="container.xl" p={4}>
        <Switch>
          <Route exact path={'/'} component={RecordGame} />
          <Route exact path={'/boardgameList'} component={BoardgamesList} />
          <Route exact path={'/playerList'} component={PlayersList} />
          <Route exact path={'/gameRecordList'} component={GameRecordList} />
          <Route
            exact
            path={'/playerList/:id'}
            component={PlayerDetails}
          />
          <Route
            exact
            path={'/boardgameList/:id'}
            component={BoardgameDetails}
          />
          <Route
            exact
            path={'/gameRecordList/:id'}
            component={GameRecordDetails}
          />
        </Switch>
      </Container>
    </Flex>
  )
}
export default App
