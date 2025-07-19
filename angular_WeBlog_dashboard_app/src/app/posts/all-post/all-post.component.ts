import { PostsService } from './../../services/posts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {

  postArray: any[] = [];

  constructor(private PostsService: PostsService) { }

  ngOnInit(): void {
    this.PostsService.loadData().subscribe(val => {
      console.log(val);
      this.postArray = val;
    })
  }

  onDelete(postImgPath: any, id: any) {
    this.PostsService.deleteImage(postImgPath, id);
  }

  onFeatured(id: any, value: any) {
    const featuredData = {
      isFeatured: value
    }
    this.PostsService.markFeatured(id, featuredData);
  }
}
