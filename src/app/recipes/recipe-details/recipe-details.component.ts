import { Component, OnInit, Input, ContentChild, ElementRef } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  @Input() recipeDetail: Recipe;
  constructor() { }

  ngOnInit(): void {
  }

}
