import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // Implementing concept of Lazy loading
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
  // lazy loading shopping-list
  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(mod => mod.ShoppingListModule)
  },
  // lazy loading auth
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
