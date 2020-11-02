import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Transaction} from '../models/transaction'
import {TransactionService} from '../services/transaction/transaction.service';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
	transactions: Transaction[] = [];
  csvFileToUpload: File = null;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(){
  	this.loadTransactions();
   
    }  
   loadTransactions() {
    this.transactionService.getTransactions().subscribe(data => {this.transactions = data; console.log(data)});
  }

  delete(transactionId) {
    const ans = confirm('Do you want to delete transaction with id: ' + transactionId);
    if (ans) {
      this.transactionService.deleteTransaction(transactionId).subscribe((data) => {
        this.loadTransactions();
      });
    }
  }

  importCsv(files: FileList){
    this.csvFileToUpload = FileList[0];
    this.transactionService.importCsv(this.csvFileToUpload).subscribe(data => {console.log(data)});
  }

  exportExcel(){
    this.transactionService.exportExcel().subscribe(data => saveAs(data));
  }
}
