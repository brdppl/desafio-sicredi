import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestApiService } from '../services/request-api.service';
import { Dragons } from '../interfaces/dragons';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { UtilsService } from '../services/utils.service';
import { ToastComponent } from '../toast/toast.component';
import { EditComponent } from '../edit/edit.component';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { LoginService } from '../services/login.service';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public user: User = {
    id: 0,
    name: '',
    last_name: '',
    photo_url: '',
    email: ''
  };
  public q = '';
  public dragons: MatTableDataSource<Dragons>;
  public isLoadingDragons = false;
  public displayedColumns: string[] = ['name', 'type', 'createdAt', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  public faInfoCircle = faInfoCircle;
  public alertInfo = true;

  constructor(
    public reqService: RequestApiService,
    public util: UtilsService,
    public dialog: MatDialog,
    public router: Router,
    public loginService: LoginService
  ) { }

  ngOnInit() {
    // Verifica se o usuário está logado
    if (this.loginService.userVerify()) {
      this.user = this.loginService.userVerify();
    }

    this.listDragons();

    this.util.defineTitle('Lista de dragões');
  }

  async listDragons() {
    this.isLoadingDragons = true;
    await this.reqService.getRequest('dragon').subscribe((data: any) => {
      if (data && data.length) {
        this.isLoadingDragons = false;
        this.dragons = new MatTableDataSource(data);
        this.dragons.paginator = this.paginator;
        this.dragons.sort = this.sort;
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  search(q: string) {
    this.dragons.filter = q.trim().toLowerCase();

    if (this.dragons.paginator) {
      this.dragons.paginator.firstPage();
    }
  }

  edit(dragon) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '400px',
      maxWidth: '',
      disableClose: true,
      data: dragon
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.listDragons();
      }
    });
  }

  async delete(dragon) {
    if (confirm(`Tem certeza que deseja remover o dragão ${dragon.name}?`)) {
      await this.reqService.delRequest(`dragon/${dragon.id}`).subscribe((data: any) => {
        this.util.toaster(ToastComponent, 4000, {message: 'Dragão removido com sucesso!'});
        this.listDragons();
      });
    }
  }

  details(dragon) {
    this.router.navigate([`dragon/${dragon.id}`]);
  }

}
