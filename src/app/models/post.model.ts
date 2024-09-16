export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }
  
  export interface PostComment {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
  }