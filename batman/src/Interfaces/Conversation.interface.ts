export interface IConversation {
  conversationId: number | string;
  id: number | string;
  name: string;
  username: string;
  profilePicture: string | null;
  title: string | null;
  userId: string | string;
  timestamp: string | null;
  lastMessage: string | null;
}
