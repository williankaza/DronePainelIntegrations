import { Component, OnInit } from '@angular/core';
import { PoTableAction } from '@po-ui/ng-components';
import { PoTableColumn } from '@po-ui/ng-components';
import { HttpService } from 'src/app/services/http.service';
import { Router, ActivatedRoute } from '@angular/router';

interface Drones{
  id: string,
}

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {
  gridCols: Array<PoTableColumn> = [
    {
      label: 'Drones Id',
      property: 'id',
    },
    {
      label:'Change',
      type: 'button'
    },
    {
      label:'Remove',
      type: 'button'
    }
  ]

  gridActions: Array<PoTableAction> = [
    {
      label: 'Change',
      action: this.ngOnInit.bind(this)
    },
    {
      label: 'Remove',
      action: this.ngOnInit.bind(this)
    }
  ]


  listDrones: Array<Drones> = [
    {
      id: '00000001',
    },
    {
      id: '00000002',
    },
    {
      id: '00000003',
    },
    {
      id: '00000004',
    }
  ]
  constructor(private httpService: HttpService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void { 
    this.getDrones()
  }

  getDrones(){
    this.httpService.get('drones').subscribe(response=>{
      response.forEach(droneResp => {
          let drone: Drones = {
            id: droneResp.idDrone
          }

          this.listDrones.push(drone)
      });
    })
  }

  goToCadastro(){
    this.router.navigate(['./cadastro'], { relativeTo: this.route })
  }
}
