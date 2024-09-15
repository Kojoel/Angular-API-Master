import { Component } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';
import { Post } from '../../models/post.model';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {

  posts: Post[] = [];

  constructor(private apiService: ApiClientService) {}

  ngOnInit() {
    this.apiService.getPosts().subscribe({
      next: (posts) => this.posts = posts,
      error: (error) => console.error('Error fetching posts:', error)
    })
  }
}
