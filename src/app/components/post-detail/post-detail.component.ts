import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../core/services/api-client.service';
import { Post } from '../../models/post.model';
import { PostComment } from '../../models/post.model';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit{

  postWithComments$!: Observable<{post: Post, comments: PostComment[]}>;
  gottenid: number = 0;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiClientService,
    private router: Router
  ) {}

  ngOnInit() {
    this.postWithComments$ = this.route.paramMap.pipe(
      switchMap(params => {
        const postId = Number(params.get('id'));
        this.gottenid = postId;
        return forkJoin({
          post: this.apiService.getPost(postId),
          comments: this.apiService.getComments(postId)
        });
      })
    );
  }

  editPost() {
    this.router.navigate(['/posts/edit/', this.gottenid]);
    console.log(this.gottenid)
  }

  gotoPosts() {
    this.router.navigate(['/posts']); // Adjust the route to match your configuration
  }
}
