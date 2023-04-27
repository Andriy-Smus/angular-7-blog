import { Component } from '@angular/core';
import { IBlogResponse } from '../interface/blog.interface';
import { BlogService } from '../service/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  public userBlog: Array<IBlogResponse> = [];

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.blogService.getAll().subscribe(data => {
      this.userBlog = data;
    })
  }
}
