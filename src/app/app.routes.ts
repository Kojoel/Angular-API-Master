import { Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';

export const routes: Routes = [
    { path: '', redirectTo: 'posts', pathMatch: 'full' }, // Redirect to 'posts' when the path is empty
    { path: 'posts', component: PostListComponent },       // Default path to show the posts list
    { path: 'post/:id', component: PostDetailComponent },
    { path: 'posts/create', component: PostCreateComponent },
    { path: 'posts/edit/:id', component: PostEditComponent },
    { path: '**', redirectTo: 'posts', pathMatch: 'full' } 
];
