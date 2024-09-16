import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Post } from '../../models/post.model';
import { ApiClientService } from '../../core/services/api-client.service';
import { NgIf } from '@angular/common';
import { PostService } from '../../core/services/post.service';

@Component({
  selector: 'app-post-edit',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, FormsModule],
  templateUrl: './post-edit.component.html',
  styleUrl: './post-edit.component.scss'
})
export class PostEditComponent {
  post: Post | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPost(id).subscribe({
      next: (post) => {
        if (post) {
          this.post = post; // Assign the post to `this.post` after successful retrieval
        } else {
          console.error('Post not found');
        }
      },
      error: (error) => {
        console.error('Error fetching post:', error);
      }
    });
  }

  onSubmit() {
    if (this.post) {
      this.postService.updatePost(this.post);
      this.router.navigate(['/posts', this.post.id]);
    } else {
      console.error('No post to update.');
    }
  }

  // ngOnInit() {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.post = this.postService.getPost(id);
  // }

  // onSubmit() {
  //   if (this.post) {
  //     this.postService.updatePost(this.post);
  //     this.router.navigate(['/posts', this.post.id]);
  //   }
  // }
  

}
