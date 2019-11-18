import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../interfaces/user';
import { LoginService } from '../services/login.service';
import { faCamera, faCloudUploadAlt, faLock, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  formProfile: FormGroup;
  public user: User = {
    id: 0,
    name: '',
    last_name: '',
    photo_url: '',
    email: ''
  };
  public faCamera = faCamera;
  public faCloudUploadAlt = faCloudUploadAlt;
  public faLock = faLock;
  public faInfoCircle = faInfoCircle;

  public alertInfo = true;

  constructor(
    public loginService: LoginService,
    public util: UtilsService
  ) { }

  ngOnInit() {
    // Verifica se o usuário está logado
    if (this.loginService.userVerify()) {
      this.user = this.loginService.userVerify();
    }

    this.formProfile = new FormGroup({
      name: new FormControl(this.user.name),
      last_name: new FormControl(this.user.last_name),
      photo_url: new FormControl(this.user.photo_url),
      email: new FormControl(this.user.email)
    });

    this.util.defineTitle('Meus dados');
  }

}
