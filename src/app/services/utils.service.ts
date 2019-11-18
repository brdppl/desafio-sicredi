import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    public toast: MatSnackBar,
    public title: Title
  ) { }

  toaster(component, duration, data) {
    this.toast.openFromComponent(component, {
      duration,
      data
    });
  }

  defineTitle(title) {
    this.title.setTitle(`Dragons App - ${title}`);
  }
}
