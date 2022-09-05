import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  /* @ViewChild('nameInput', { static: true }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: true }) amountInputRef: ElementRef; */

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    console.log(form.value);  //{amount:_ , name:'_'}
    /* const ingName = this.nameInputRef.nativeElement.value;
    const ingAmout = this.amountInputRef.nativeElement.value; */

    const newIngredient = new Ingredient(value.name, value.amount);
    this.shoppingService.addIngredient(newIngredient);
  }

}
