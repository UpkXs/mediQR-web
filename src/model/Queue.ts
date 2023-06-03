export interface Queue {
  queueId: string,
  verificationCode: string;
  queueCode: number,
  queueNumber: number
  reason: string,
  isLeaved?: boolean,
}
