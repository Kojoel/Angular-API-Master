import { Component } from '@angular/core';
import { ApiClientService } from '../../core/services/api-client.service';
import { Post } from '../../models/post.model';
import { Router, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { RouteReuseStrategy } from '@angular/router';
import { PostService } from '../../core/services/post.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [RouterLink, NgFor, PaginationComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {

  posts: Post[] = [];
  currentPage = 1;
  totalPages = 1;
  postsPerPage = 10;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {
    this.loadPosts();
    this.postService.posts$.subscribe(paginatedResponse => {
      this.posts = paginatedResponse.items;
      this.currentPage = paginatedResponse.page;
      this.totalPages = Math.ceil(paginatedResponse.total / paginatedResponse.limit);
    });
  }

  loadPosts() {
    this.postService.loadPosts(this.currentPage, this.postsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadPosts();
  }

  createNewPost() {
    this.router.navigate(['/posts/create']);
  }

}
