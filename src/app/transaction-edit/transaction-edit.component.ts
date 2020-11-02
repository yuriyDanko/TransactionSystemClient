import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {Transaction} from '../models/transaction';
import {Status} from '../models/status';
import {TransactionViewModelUpdate} from '../models/transaction-view-model-update'
import {TransactionService} from '../services/transaction/transaction.service';
import {StatusService} from '../services/status/status.service';


@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.css']
})
export class TransactionEditComponent implements OnInit {
	form: FormGroup;
  idTransaction: number;
  formTransactionId: string;
	formClientName: string;
	formClientSurname: string;
	formStatusName: string;
	formTypeName: string;
	formAmount: string; 
  errorMessage: any;
  existingTransaction: Transaction;
  statuses: Status[] = [];
  idOfSelectedStatus: number = 0;

  constructor(private transactionService: TransactionService, private statusService: StatusService,

    private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) { 
  	const idParam = 'id';
    this.formTransactionId = 'transactionId';
    this.formClientName = 'clientName';
    this.formClientSurname = 'clientSurname';
    this.formStatusName = 'statusName';
    this.formTypeName = 'typeName';
    this.formAmount = 'amount';
    if (this.avRoute.snapshot.params[idParam]) {
      this.idTransaction = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        transactionId: 0,
        clientName: ['', [Validators.required]],
        clientSurname: ['', [Validators.required]],
        statusName: ['', [Validators.required]],
        typeName: ['', [Validators.required]],
        amount: 0
      }
    )
  }

  ngOnInit(): void {
    this.loadStatuses();
  	if (this.idTransaction > 0) {
  		console.log(this.transactionId);
      this.transactionService.getTransactionById(this.idTransaction)
        .subscribe(data => (
          this.existingTransaction = data,
          this.form.controls[this.formTransactionId].setValue(data.transactionId),
          this.form.controls[this.formClientName].setValue(data.clientName),
          this.form.controls[this.formClientSurname].setValue(data.clientSurname),
          this.form.controls[this.formStatusName].setValue(data.statusName),
          this.form.controls[this.formTypeName].setValue(data.typeName),
          this.form.controls[this.formAmount].setValue(data.amount)
        ));
    }
  }

  get transactionId() {return this.form.get(this.formTransactionId);}
  get clientName() { return this.form.get(this.formClientName); }
  get clientSurname() { return this.form.get(this.formClientSurname); }
  get statusName() { return this.form.get(this.formStatusName); }
  get typeName() { return this.form.get(this.formTypeName); }
  get amount() { return this.form.get(this.formAmount); }

   cancel() {
    this.router.navigate(['/transactions']);
  }

  save(){
    let transaction: TransactionViewModelUpdate = {
      transactionId: this.existingTransaction.transactionId,
      clientName: this.existingTransaction.clientName,
      clientSurname: this.existingTransaction.clientSurname,
      statusId: this.idOfSelectedStatus,
      typeId: 0,
      amount: this.existingTransaction.amount
    };
    this.transactionService.updateTransaction(transaction.transactionId, transaction).subscribe((data) => {
          this.router.navigate(['/transactions']);
        });
  }

   loadStatuses() {
    this.statusService.getStatuses().subscribe(data => {this.statuses = data; console.log(this.statuses)});
  }

   selectOption(id: number) {
    //getted from event
   this.idOfSelectedStatus = id;
    //getted from binding
    console.log(this.idOfSelectedStatus);
  }

}
