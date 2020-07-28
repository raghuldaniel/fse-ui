import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { CategoryService } from '../services/category.service';
import { Category } from '../category';


export interface catg {
  name: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories : Array<Category>;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  constructor(private categoryService :  CategoryService) {
    
   }


  ngOnInit() {
   this.categoryService.getCategories().subscribe(res => {
     console.log("catres"+res);
    this.categories = res;
   })
  }
  
  // readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  

  add(event: MatChipInputEvent): void {
    console.log(event)
    const input = event.input;
    const value = event.value;

    let category = new Category();

    // Add our catg
    if ((value || '').trim()) {
      category.categoryDescription = value.trim();
      category.categoryName = value.trim();
      this.categoryService.addCategories(category).subscribe(res =>{
        console.log(res)
      },err => {
        console.log(err)
      })
      
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(catg: Category): void {
   

    this.categoryService.deleteCategories(catg.categoryId);

    
  }

}
