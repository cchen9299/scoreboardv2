import gql from "graphql-tag";

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
    gameRecords {
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
`;

export const READ_BOARDGAMES = gql`
  query {
    boardgames {
      _id
      name
    }
  }
`;

export const READ_PLAYERS = gql`
  query {
    players {
      _id
      firstName
      lastName
    }
  }
`;

export const READ_RECORDS = gql`
  query {
    gameRecords {
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
`;

export const INSERT_RECORD = gql`
  mutation InsertGameRecord($data: GameRecordInsertInput!) {
    insertOneGameRecord(data: $data) {
      boardgamePlayed {
        _id
        name
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
`;

export const INSERT_ONE_BOARDGAME = gql`
  mutation insertOneBoardgame($data: BoardgameInsertInput!) {
    insertOneBoardgame(data: $data) {
      name
      expansionsOwned
    }
  }
`;

export const INSERT_ONE_PLAYER = gql`
  mutation InsertPlayer($data: PlayerInsertInput!) {
    insertOnePlayer(data: $data) {
      firstName
      lastName
    }
  }
`;

export const INSERT_MANY_PLAYERS = gql`
  mutation InsertPlayers($data: PlayerInsertInput!) {
    insertManyPlayers(data: [$data]) {
      insertedIds
    }
  }
`;
