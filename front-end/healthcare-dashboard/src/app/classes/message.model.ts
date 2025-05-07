export interface Message {
  sender: string;
  subject: string;
  date: Date;
  body: string;
  isRead: boolean;
  attachments?: { name: string; url: string }[];  // Mark attachments as optional
}
