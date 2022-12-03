import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Store } from "@ngrx/store";
import * as fromApp from '../global-Store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  subscription: Subscription;
  isAuthenticated: boolean = false;

  constructor(private storeDataService: DataStorageService, private authService: AuthService, private route: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('auth').pipe(
      map(authState => {
        console.log('authState: ', authState);
        return authState.user;
      })
    ).subscribe(user => {
      this.isAuthenticated = !!user;  //This is same as writing --> this.isAuthenticated === !user ? false : true;
      console.log('User value set to: ', user);
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

  onLogout() {
    this.authService.logout();
    this.route.navigate(['/auth']);
  }

}
