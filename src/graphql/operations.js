import gql from 'graphql-tag'

export const READ_ALL = gql`
  query {
    boardgames {
      _id
      name
      expansionsOwned
    }
    players {
      _id
      firstName
      lastName
    }
    gameRecords(sortBy: DATE_DESC) {
      _id
      expansionsPlayed
      date
      boardgamePlayed {
        _id
        name
      }
      players {
        firstName
        lastName
        score
        _id
      }
    }
  }
`

export const READ_BOARDGAMES = gql`
  query {
    boardgames {
      _id
      name
      expansionsOwned
    }
  }
`

export const READ_PLAYERS = gql`
  query {
    players {
      _id
      firstName
      lastName
    }
  }
`

export const READ_RECORDS = gql`
  query {
    gameRecords(sortBy: DATE_DESC) {
      _id
      expansionsPlayed
      date
      boardgamePlayed {
        _id
        name
        expansionsOwned
      }
      players {
        firstName
        lastName
        score
        _id
      }
    }
  }
`

export const READ_PLAYER_RECORDS = gql`
  query readBoardgameRecords($_id: ObjectId) {
    gameRecords(query: {players: {_id: $_id}} sortBy: DATE_DESC) {
      players {
        _id
        firstName
        lastName
        score
      }
      date
      boardgamePlayed{
        _id
        name
        expansionsOwned
      }
      expansionsPlayed
    }
    player(query: {_id: $_id}){
      _id
      firstName
      lastName
    }
  }
`

export const READ_BOARDGAME_RECORDS = gql`
  query readBoardgameRecords($_id: ObjectId) {
    gameRecords(query: {_id: $_id} sortBy: DATE_DESC) {
      boardgamePlayed {
        _id
        name
        expansionsOwned
      }
      date
    }
  }
`

export const INSERT_RECORD = gql`
  mutation InsertGameRecord($data: GameRecordInsertInput!) {
    insertOneGameRecord(data: $data) {
      boardgamePlayed {
        _id
        name
        expansionsOwned
      }
      expansionsPlayed
      date
      players {
        _id
        firstName
        lastName
        score
      }
    }
  }
`

export const INSERT_ONE_BOARDGAME = gql`
  mutation insertOneBoardgame($data: BoardgameInsertInput!) {
    insertOneBoardgame(data: $data) {
      name
      expansionsOwned
    }
  }
`

export const INSERT_ONE_PLAYER = gql`
  mutation InsertPlayer($data: PlayerInsertInput!) {
    insertOnePlayer(data: $data) {
      firstName
      lastName
    }
  }
`

export const INSERT_MANY_PLAYERS = gql`
  mutation InsertPlayers($data: PlayerInsertInput!) {
    insertManyPlayers(data: [$data]) {
      insertedIds
    }
  }
`

export const DELETE_ONE_PLAYER = gql`
  mutation DeletePlayer($id: ObjectId) {
    deleteOnePlayer(query: { _id: $id }) {
      _id
    }
  }
`

export const DELETE_ONE_BOARDGAME = gql`
  mutation DeleteBoardgame($id: ObjectId) {
    deleteOneBoardgame(query: { _id: $id }) {
      _id
    }
  }
`

export const DELETE_ONE_GAMERECORD = gql`
  mutation DeleteGameRecord($id: ObjectId) {
    deleteOneGameRecord(query: { _id: $id }) {
      _id
    }
  }
`

export const UPSERT_ONE_PLAYER = gql`
  mutation UpsertPlayer(
    $_id: ObjectId
    $firstName: String, 
    $lastName: String
    ) {
    upsertOnePlayer(
      query: { 
        _id: $_id
      }
      data: { 
        firstName: $firstName, 
        lastName: $lastName 
      }
    ) {
      firstName
      lastName
    }
  }
`

export const UPSERT_ONE_BOARDGAME = gql`
  mutation UpsertBoardgame(
    $_id: ObjectId
    $name: String
    $expansionsOwned: [String]
  ) {
    upsertOneBoardgame(
      query: { 
        _id: $_id 
      }
      data: { 
        name: $name, 
        expansionsOwned: $expansionsOwned 
      }
    ) {
      name
      expansionsOwned
    }
  }
`
export const UPSERT_ONE_GAMERECORD = gql`
  mutation UpsertBoardgame(
    $_id: ObjectId
    $boardgamePlayed: GameRecordBoardgamePlayed
    $expansionsPlayed: [String]
    $players: [GameRecordPlayer]
    $date: DateTime
  ) {
    upsertOneBoardgame(
      query: { 
        _id: $_id 
      }
      data: { 
        boardgamePlayed: $boardgamePlayed, 
        expansionsPlayed: $expansionsPlayed, 
        players: $players, 
        date:$date  
      }
    ) {
      boardgamePlayed {
        _id
        name
      }
      expansionsPlayed
      player {
        _id
        firstName
        lastName
        score
      }
      date
    }
  }
`
