import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }
}
