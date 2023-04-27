import { Component } from '@angular/core';
import { IBlog } from '../interface/blog.interface';
import { BlogService } from '../service/blog.service';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent {
  public adminBlog!: IBlog[];
  public newTitle = '';
  public newText = '';
  public newAuthor = '';
  public imagePath = 'https://www.jimdo.com/static/7f58e83e14a16db25da8e56995f710b8/b086f/hero.jpg';
  public editID!: number;
  public editStatus = false;

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.blogService.getAll().subscribe(data => {
      this.adminBlog = data;
    })
  }

  addPost(): void {
    const newPost = {
      title: this.newTitle,
      text: this.newText,
      author: this.newAuthor,
      imagePath: this.imagePath
    }
    this.blogService.create(newPost).subscribe(() => {
      this.getPosts();
      this.resetForm();
    })
  }

  editPost(post: IBlog): void {
    this.newTitle = post.title;
    this.newText = post.text;
    this.newAuthor = post.author;
    this.editID = post.id;
    this.editStatus = true;
  }

  savePost(): void {
    const updatePost = {
      title: this.newTitle,
      text: this.newText,
      author: this.newAuthor,
      imagePath: this.imagePath
    };
    this.blogService.update(updatePost, this.editID).subscribe(() => {
      this.getPosts();
      this.resetForm();
      this.editStatus = false;
    })
  }

  deletePost(post: IBlog): void {
    this.blogService.delete(post.id).subscribe(() => {
      this.getPosts();
    })
  }

  private resetForm(): void {
    this.newTitle = '';
    this.newText = '';
    this.newAuthor = '';
  }
}
