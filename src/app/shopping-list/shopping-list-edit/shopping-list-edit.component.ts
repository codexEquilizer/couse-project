import { formatCurrency } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import * as ShoppingListActions from '../store/shopping-list.action'
import * as fromApp from '../../global-Store/app.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  /* @ViewChild('nameInput', { static: true }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: true }) amountInputRef: ElementRef; */
  @ViewChild('f', { static: false }) shoppingForm: NgForm;

  constructor(private shoppingService: ShoppingService, private store: Store<fromApp.AppState>) { }

  subscription: Subscription;
  editMode = false;
  editedIndexItem: number;
  editedItem: Ingredient;

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedIndexItem = stateData.editedIngredientIndex;
        this.editedItem = stateData.editedIngredient;
        this.shoppingForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
      else
        this.editMode = false;
    });
    /* this.subscription = this.shoppingService.startedEditing.subscribe(
      (index: number) => {
        this.editedIndexItem = index;
        this.editMode = true;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.shoppingForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    ); */
  }

  /* On clicking Update/Add button */
  onAddItem(form: NgForm) {
    const value = form.value;
    console.log(form.value);  //{amount:_ , name:'_'}

    // Adding the new items to the Ingredients list
    const newIngredient = new Ingredient(value.name, value.amount);

    // For Update or Add button logic
    if (this.editMode) {
      // this.shoppingService.updateIngredient(this.editedIndexItem, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ index: this.editedIndexItem, ingredient: newIngredient }));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      // this.shoppingService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  /* On clicking clear button */
  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  /* On clicking delete button */
  onDelete() {
    // this.shoppingService.deleteIngredient(this.editedIndexItem);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedIndexItem));
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());  // When we change the page while editing then we stop the editing so that we don't get a strange behavior when we next time visit the page or try to edit
  }

}
