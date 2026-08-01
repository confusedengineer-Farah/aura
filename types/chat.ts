export interface Chat {
  id: string;
  members: string[];
  lastMessage: string;
  lastUpdated?: {
    toDate: () => Date;
  };
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  read: boolean;
  createdAt?: {
    toDate: () => Date;
  };
}