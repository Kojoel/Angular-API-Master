import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Post } from '../../models/post.model';
import { ApiClientService } from './api-client.service';
import { HttpClient, HttpParams } from '@angular/common/http';


interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';
  
  private postsSubject = new BehaviorSubject<PaginatedResponse<Post>>({
    items: [],
    total: 0,
    page: 1,
    limit: 10
  });
  posts$ = this.postsSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadPosts(page: number = 1, limit: number = 10): void {
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', limit.toString());

    this.http.get<Post[]>(`${this.apiUrl}/posts`, { params, observe: 'response' })
      .pipe(
        map(response => ({
          items: response.body || [],
          total: Number(response.headers.get('X-Total-Count') || 0),
          page,
          limit
        }))
      )
      .subscribe({
        next: (paginatedResponse) => this.postsSubject.next(paginatedResponse),
        error: (error) => console.error('Error fetching posts:', error)
      });
  }

  addPost(post: Post): void {
    this.http.post<Post>(`${this.apiUrl}/posts`, post).subscribe({
      next: (newPost) => {
        const currentState = this.postsSubject.getValue();
        this.postsSubject.next({
          ...currentState,
          items: [newPost, ...currentState.items.slice(0, currentState.limit - 1)],
          total: currentState.total + 1
        });
      },
      error: (error) => console.error('Error creating post:', error)
    });
  }

  updatePost(updatedPost: Post): void {
    this.http.put<Post>(`${this.apiUrl}/posts/${updatedPost.id}`, updatedPost).subscribe({
      next: (post) => {
        const currentState = this.postsSubject.getValue();
        const updatedPosts = currentState.items.map(p => p.id === post.id ? post : p);
        this.postsSubject.next({ ...currentState, items: updatedPosts });
      },
      error: (error) => console.error('Error updating post:', error)
    });
  }

  getPost(id: number): Observable<Post | undefined> {
    return this.posts$.pipe(
      map(state => state.items.find(post => post.id === id))
    );
  }

}
