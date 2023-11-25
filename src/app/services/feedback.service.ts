import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

const DURATION = 5000;

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private _snackBar: MatSnackBar) { }

  success(message: string) {
    this._snackBar.open(message, undefined, {
      duration: DURATION,
      panelClass: ['feedback-success']
    });
  }

  error(message: string) {
    this._snackBar.open(message, undefined, {
      duration: DURATION,
      panelClass: ['feedback-error']
    })
  }
}
