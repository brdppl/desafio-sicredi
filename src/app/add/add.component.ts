import { Component, OnInit } from '@angular/core';
import { RequestApiService } from '../services/request-api.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { UtilsService } from '../services/utils.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  formAdd: FormGroup;

  constructor(
    public reqService: RequestApiService,
    public util: UtilsService
  ) {
    this.formAdd = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      createdAt: new FormControl(new Date())
    });

    this.util.defineTitle('Novo dragão');
  }

  ngOnInit() {
  }

  async save(formDirective: FormGroupDirective) {
    if (!this.formAdd.value.createdAt) {
      this.formAdd.value.createdAt = new Date();
    }
    await this.reqService.postRequest('dragon', this.formAdd.value).subscribe((data: any) => {
      if (data.id) {
        this.util.toaster(ToastComponent, 4000, {message: 'Dragão adicionado com sucesso!'});
        formDirective.resetForm();
        this.formAdd.reset();
      } else {
        this.util.toaster(ToastComponent, 4000, {message: 'Houve um erro ao adicionar'});
      }
    }, (error: any) => {
      this.util.toaster(ToastComponent, 4000, {message: 'Houve um erro ao adicionar'});
    });
  }

}
