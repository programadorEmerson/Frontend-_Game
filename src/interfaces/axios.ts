interface DataResponse {
  statusCode: number;
  message: string;
}

interface Response {
  status: number;
  statusText: string;
}

export interface APIError {
  response: Response & { data: DataResponse };
}
