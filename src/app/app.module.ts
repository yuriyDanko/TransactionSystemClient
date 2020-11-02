import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionEditComponent } from './transaction-edit/transaction-edit.component';
import {TransactionService} from './services/transaction/transaction.service';
import {StatusService} from './services/status/status.service';


const appRoutes: Routes = [
  { path: 'transactions', component: TransactionsComponent },
  { path: 'transaction/edit/:id', component: TransactionEditComponent },
  ];


@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    TransactionComponent,
    TransactionEditComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
     HttpClientModule,
     FormsModule,
     ReactiveFormsModule
  ],
  providers: [TransactionService, StatusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
