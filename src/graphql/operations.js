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
