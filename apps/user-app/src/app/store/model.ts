export interface User {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  status?: UserStatus;
  isNew?: boolean;
  log?: Log[];
}
export enum UserStatus {
  OPEN,
  INPROGRESS,
  HIRED
}
export enum LogType {
  FORM,
  NEW,
  CALL,
  FOLLOW,
  HIRE
}

export interface Log {
  type?: LogType;
  desc?: string;
  time?: Date;
}
