import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import * as fromShoppingListReducer from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ ingredients: Ingredient[] }>;
  // private subscription: Subscription;

  constructor(
    private shoppingService: ShoppingService,
    //injecting the store into the component.
    private store: Store<fromShoppingListReducer.AppState>
  ) { }

  ngOnInit(): void {

    this.ingredients = this.store.select('shoppingList');
    /* 
        this.ingredients = this.shoppingService.getIngredients();
    
        this.subscription = this.shoppingService.ingredientChanged.subscribe(
          (ingredientsRecieve: Ingredient[]) => {
            this.ingredients = ingredientsRecieve;
          }
        ) */
  }

  onEditItem(index: number) {
    this.shoppingService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}
