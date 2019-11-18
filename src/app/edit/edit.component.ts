import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { RequestApiService } from '../services/request-api.service';
import { UtilsService } from '../services/utils.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  formEdit: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public reqService: RequestApiService,
    public util: UtilsService
  ) {
    this.formEdit = new FormGroup({
      name: new FormControl(this.data.name),
      type: new FormControl(this.data.type),
      updatedAt: new FormControl(new Date())
    });
  }

  ngOnInit() { }

  async save() {
    await this.reqService.putRequest(`dragon/${this.data.id}`, this.formEdit.value).subscribe((data: any) => {
      this.close(true);
      this.util.toaster(ToastComponent, 4000, {message: 'Dragão editado com sucesso!'});
    }, (error: any) => {
      this.util.toaster(ToastComponent, 4000, {message: 'Houve um erro ao editar'});
    });
  }

  close(response) {
    this.dialogRef.close({success: response});
  }

}
