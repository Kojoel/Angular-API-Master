import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError, of, shareReplay, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Post, PostComment } from '../../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  private apiUrl = 'https://jsonplaceholder.typicode.com';
  private cache: { [key: string]: { data: any; timestamp: number } } = {};
  private cacheDuration = 5 * 60 * 1000; // 5 minutes

  constructor(private http: HttpClient) {}

  getPosts(page: number = 1, limit: number = 10): Observable<Post[]> {
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', limit.toString());

    return this.http.get<Post[]>(`${this.apiUrl}/posts`, { params }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getComments(postId: number): Observable<PostComment[]> {
    console.log(postId);
    return this.http.get<PostComment[]>(`${this.apiUrl}/posts/${postId}/comments`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  createPost(post: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts`, post).pipe(
      catchError(this.handleError)
    );
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/posts/${post.id}`, post).pipe(
      catchError(this.handleError)
    );
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/posts/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private getCachedRequest(url: string): Observable<any> {
    const cachedResponse = this.cache[url];
    if (cachedResponse && Date.now() - cachedResponse.timestamp < this.cacheDuration) {
      return of(cachedResponse.data);
    }

    return this.http.get(url).pipe(
      tap(response => {
        this.cache[url] = { data: response, timestamp: Date.now() };
      }),
      shareReplay(1),
      catchError(this.handleError)
    );
  }

  clearCache() {
    this.cache = {};
  }



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
