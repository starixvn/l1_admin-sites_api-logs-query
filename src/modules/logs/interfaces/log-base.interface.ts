export interface LogBase {
  _id: {
    $oid: string;
  };
  logTimeStamp: string;
  requestTimeStamp: string;
  responseTimeStamp: string;
  operatorId?: string;
  __archive: {
    eventtime: {
      $date: string;
    };
    v: string;
  };
}

export interface LogRequest {
  playerId: number;
  siteId: string;
  seq: string;
  operatorToken: string;
}

export interface LogResponse {
  seq: string;
  errorCode: number | string;
  errorMessage: string | null;
  errorDescription: string | null;
}
