import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

interface Category {
  category: string;
}

interface CategoryEntry {
  id: string;
  data: Category;
}

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent implements OnInit {

  categoryArray: CategoryEntry[] = [];
  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val => {
      this.categoryArray = val;
    })
  }

}
