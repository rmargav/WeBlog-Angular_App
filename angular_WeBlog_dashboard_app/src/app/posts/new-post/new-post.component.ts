import { PostsService } from './../../services/posts.service';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from '../../models/category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { ActivatedRoute } from '@angular/router';

interface CategoryEntry {
  id: string;
  data: Category;
}

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  imgSrc: any = './assets/image_placeholder.jpg';
  selectedImg: any;

  categories: CategoryEntry[] = [];
  selectedCategoryId: string = '';

  postForm!: FormGroup;

  post: any;

  formStatus: string = 'Add New';

  docId: string = '';

  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private PostsService: PostsService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((val) => {
      this.docId = val['id'];
      if(this.docId){
      this.PostsService.loadOneData(val['id']).subscribe((post) => {
        this.post = post;

        this.postForm = fb.group({
          title: [this.post.title, [Validators.required, Validators.minLength(3)]],
          permalink: [this.post.permalink, Validators.required],
          excerpt: [this.post.excerpt, [Validators.required, Validators.minLength(10)]],
          category: [`${this.post.category.categoryId}-${this.post.category.category}`, Validators.required],
          postImg: ['', Validators.required],
          content: [this.post.content, Validators.required],
        })

        this.imgSrc = this.post.postImgPath;
        this.formStatus = 'Edit';

      })
    } else{
      this.postForm = fb.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        permalink: ['', Validators.required],
        excerpt: ['', [Validators.required, Validators.minLength(10)]],
        category: ['', Validators.required],
        postImg: ['', Validators.required],
        content: ['', Validators.required],
      })
    }
    })
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      this.categories = val;
    });
  }

  get fc() {
    return this.postForm.controls;
  }
  onTitleChanged($event: any) {
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-');
  }

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgSrc = e.target.result;
    };
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

  onSubmit() {
    let splitted = this.postForm.value.category.split('-');
    console.log(splitted);

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1],
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'pending',
      createdAt: new Date(),
    };

    this.PostsService.uploadImage(this.selectedImg, postData, this.formStatus, this.post.id); //TempCode(Not Working)
    this.postForm.reset();
    this.imgSrc = './assets/image_placeholder.jpg';
  }
}
