export interface Queue {
  id: string,
  verificationCode: string;
  queueNumber: number
  reason: string,
  isLeaved?: boolean,
}
