import { Component, OnInit, } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  constructor(private storeDataService: DataStorageService) { }

  ngOnInit(): void {
  }

  onSaveRecipes() {
    this.storeDataService.saveRecipes();
  }

  onFetchRecipes() {
    this.storeDataService.fetchRecipes().subscribe(recipes => {
      console.log('Fetched Recipes ', recipes);
    });
  }

}
