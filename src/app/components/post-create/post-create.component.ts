import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiClientService } from '../../core/services/api-client.service';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { PostService } from '../../core/services/post.service';
import { Post } from '../../models/post.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [NgIf, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent {

  newPost: Post = {
    title: '', body: '',
    id: 0,
    userId: 0
  };

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  onSubmit() {
    this.postService.addPost(this.newPost);
    this.router.navigate(['/posts']);
  }

  // postForm: FormGroup;

  // constructor(
  //   private fb: FormBuilder,
  //   private apiService: ApiClientService,
  //   private router: Router
  // ) {
  //   this.postForm = this.fb.group({
  //     title: ['', [Validators.required, Validators.minLength(3)]],
  //     body: ['', [Validators.required, Validators.minLength(10)]]
  //   });
  // }

  // onSubmit() {
  //   if (this.postForm.valid) {
  //     this.apiService.createPost(this.postForm.value).subscribe({
  //       next: (newPost) => {
  //         console.log('Post created successfully', newPost);
  //         this.router.navigate(['/post']);
  //       },
  //       error: (error) => {
  //         console.error('Error creating post', error);
  //       }
  //     });
  //   }
  // }
}
