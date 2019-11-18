import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestApiService } from '../services/request-api.service';
import { Dragons } from '../interfaces/dragons';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public dragonId: string;
  public dragon: Dragons = {
    id: '',
    name: '',
    type: '',
    createdAt: ''
  };
  public isLoadingDragon = false;

  constructor(
    public route: ActivatedRoute,
    public reqService: RequestApiService,
    public util: UtilsService
  ) {
    this.route.params.subscribe(data => {
      this.dragonId = data.id;
    });
  }

  ngOnInit() {
    this.listDragon();
  }

  async listDragon() {
    this.isLoadingDragon = true;
    await this.reqService.getRequest(`dragon/${this.dragonId}`).subscribe((data: any) => {
      if (data) {
        this.isLoadingDragon = false;
        this.dragon = data;

        this.util.defineTitle(this.dragon.name);
      }
    });
  }

}
