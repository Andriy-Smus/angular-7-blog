import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBlogRequest, IBlogResponse } from '../interface/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private url = environment.BACKEND_URL;
  private api = { posts: `${this.url}/posts`}

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<IBlogResponse[]> {
    return this.http.get<IBlogResponse[]>(this.api.posts)
  }

  create(post: IBlogRequest): Observable<IBlogResponse> {
    return this.http.post<IBlogResponse>(this.api.posts, post)
  }

  update(post: IBlogRequest, id: number): Observable<IBlogResponse> {
    return this.http.patch<IBlogResponse>(`${this.api.posts}/${id}`, post);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.posts}/${id}`)
  }
}
