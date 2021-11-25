import { Checkbox } from '@chakra-ui/checkbox'
import { Wrap, Text } from '@chakra-ui/layout'
import React from 'react'

export default function Bingo () {
  const arr = [
    'Office quote',
    'Seinfeld quite',
    'Thats what she said',
    'Tyler spitting up liquid from laughter',
    'A dad napping on the floor',
    'No Eyebrow joke',
    '"Vacation tank"',
    'Dad arm impression',
    'Someone mentions going to a movie',
    'Christmas plans',
    'Fat joke',
    'Football game',
    'Injury from cooking',
    'Family picture',
    'Thankful for wife',
    'Thankful for freedom',
    'Phil asks G about shooting indians',
    'Happy tears',
    'Spills something',
    '"The lightning"',
    'Turkey takes too long',
    'Not enough gravy',
    'Someone says pilgrims',
    'Eat dark meat only',
    'Line up for Black Friday',
    '"Just here for the food"',
    'Awkward dinner topic',
    'Turkey bowl injury',
    'Turkey trot injury',
    'Political talk',
    'Someone leaves room after argument',
    'Forgot food at home',
    'Vaccination status',
    'Refusal to vaccinate',
    'Christmas music starts playing',
    'Rub belly "food baby"',
    'Netflix show',
    'Thanksgiving themed attire',
    'Someone wears a hoodie',
    'Shorts and long socks'
  ]

  let newArr = []
  const collection = []

  const genRandom = (a) => {
    const copyA = [...a]
    const max = a.length - 1
    if (collection.length === 25) {
      return collection
    }
    if (newArr.length === 25) {
      collection.push(newArr)
      newArr = []
      return genRandom(arr)
    }
    if (newArr.length === 12) {
      newArr.push('FREE SPACE')
    } else {
      const rand = Math.floor(Math.random() * max)
      newArr.push(copyA[rand])
      copyA.splice(rand, 1)
    }
    return genRandom(copyA)
  }

  const randomedArr = genRandom(arr)[0]

  return (
    <Wrap spacing={0}>
      {randomedArr.map((square) => {
        return (
          <Checkbox
            alignItems={'center'}
            justifyContent={'center'}
            width={'20%'}
            key={square}
            p={2}
            border={'1px solid lightgrey'}
            height={79}
          >
            <Text textAlign="center">{square}</Text>
          </Checkbox>
        )
      })}
    </Wrap>
  )
}
