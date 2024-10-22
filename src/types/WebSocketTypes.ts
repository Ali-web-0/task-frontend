export interface Message {
    content: string;
    type: string;
}
export interface User {
    content: string;
    isUser: boolean; // Field to identify user messages
}