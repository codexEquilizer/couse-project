import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  subscription: Subscription;
  isAuthenticated: boolean = false;

  constructor(private storeDataService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;  //This is same as writing --> this.isAuthenticated === !user ? false : true;
      console.log(user);
    });
  }

  onSaveRecipes() {
    this.storeDataService.saveRecipes();
  }

  onFetchRecipes() {
    this.storeDataService.fetchRecipes().subscribe(recipes => {
      console.log('Fetched Recipes ', recipes);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
