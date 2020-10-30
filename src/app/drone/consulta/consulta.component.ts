import { Component, OnInit } from '@angular/core';
import { PoTableAction, PoTableDetail } from '@po-ui/ng-components';
import { PoTableColumn } from '@po-ui/ng-components';
import { HttpService } from 'src/app/services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { timer, interval, Subscription } from "rxjs";

interface Drones{
  id: string,
  qtdMedicoes: number,
  lastMedicao: Array<Medicao>
}

interface Medicao{
  temperatura: number,
  umidade: number,
  latitude: number,
  longitude: number,
  rastreamento: boolean,
  dataAtualizacao: string
}

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {
  lastMedicaoDetail : PoTableDetail = {
    columns: [
      { property: 'latitude' },
      { property: 'longitude' },
      { property: 'temperatura'},
      { property: 'umidade'},
      { property: 'rastreamento'},
      { property: 'dataAtualizacao', type: 'dateTime'}
    ],
    typeHeader: 'inline'
  };
  gridCols: Array<PoTableColumn> = [
    {
      label: 'Drones Id',
      property: 'id',
      type: 'number'
    },
    {
      label: 'Quantidade medições',
      property: 'qtdMedicoes',
      type: 'number'
    },
    {
      label:'Change',
      type: 'button'
    },
    {
      label:'Remove',
      type: 'button'
    },
    {
      property: 'lastMedicao',
      type: 'detail',
      detail: this.lastMedicaoDetail
    }
  ]

  gridActions: Array<PoTableAction> = [
    {
      label: 'Change',
      action: this.goToDroneEdit.bind(this)
    },
    {
      label: 'Remove',
      action: this.ngOnInit.bind(this)
    }
  ]


  listDrones: Array<Drones>
  originalTimer: number = 30
  timerTick: number = 30
  timerSubscription: Subscription;
  constructor(private httpService: HttpService,
    private router: Router, private route: ActivatedRoute) { 
    this.listDrones = new Array();
  }

  ngOnInit(): void {
    if (localStorage['droneTimer'] != undefined){
      this.timerTick = parseInt(localStorage['droneTimer']) * 1000
    } 
    this.originalTimer = this.timerTick
    this.getDrones()
    
    this.createTimer(this.timerTick)

    interval(1000).pipe(map((x)=>{
      this.timerTick -= 1000
      return true
    })).subscribe()
  }

  createTimer(timerTick: number){
    this.timerSubscription = timer(0,timerTick).subscribe(()=>{
      this.enviaNovasMedicoes()
    })
  }

  goToDroneEdit(row: any){
    this.router.navigate(['./cadastro', row.id], { relativeTo: this.route })
  }

  getDrones(){
    /*
    this.httpService.get('drones').subscribe(response=>{
      response.forEach(droneResp => {
          let ultimaMedicao = this.getDadosLastMedicao(droneResp.medicoes)

          let drone: Drones = {
            id: droneResp.idDrone,
            qtdMedicoes: droneResp.medicoes?.length,
            lastMedicao: [{
              latitude: ultimaMedicao.latitude,
              longitude: ultimaMedicao.longitude,
              temperatura: ultimaMedicao.temperatura,
              umidade: ultimaMedicao.umidade,
              rastreamento: ultimaMedicao.rastreamento,
              dataAtualizacao: ultimaMedicao.dataAtualizacao
            }]
          }

          this.listDrones.push(drone)
      });
    })
    */
  }

  goToCadastro(){
    this.router.navigate(['./cadastro'], { relativeTo: this.route })
  }

  forcarEnvio(){
    this.timerSubscription.unsubscribe()
    this.timerSubscription = timer(0,this.originalTimer).subscribe(()=>{
      this.enviaNovasMedicoes()
    })
  }

  enviaNovasMedicoes(){
    this.httpService.get('drones').subscribe(
      (response)=>{
        response.forEach(droneResp => {
          let droneIndex = this.listDrones.findIndex(drone=> drone.id == droneResp.idDrone )
          
          if (droneIndex > -1 ){
            let lastMedicao = this.getDadosLastMedicao(droneResp.medicoes)
            this.listDrones[droneIndex].qtdMedicoes = (droneResp.medicoes).length
            this.listDrones[droneIndex].lastMedicao[0] = lastMedicao

            if (lastMedicao.rastreamento){
              this.sendNewMedicao({ id: droneResp.idDrone, lastMedicao: lastMedicao })
            }
          } else {
            let ultimaMedicao = this.getDadosLastMedicao(droneResp.medicoes)

            let drone: Drones = {
              id: droneResp.idDrone,
              qtdMedicoes: droneResp.medicoes?.length,
              lastMedicao: [{
                latitude: ultimaMedicao.latitude,
                longitude: ultimaMedicao.longitude,
                temperatura: ultimaMedicao.temperatura,
                umidade: ultimaMedicao.umidade,
                rastreamento: ultimaMedicao.rastreamento,
                dataAtualizacao: ultimaMedicao.dataAtualizacao
              }]
            }
  
            this.listDrones.push(drone)
          }
        });
      }
    )
    this.timerTick = this.originalTimer
  }


  sendNewMedicao(novaMedicao: { id: string, lastMedicao: Medicao } ){
    novaMedicao.lastMedicao.dataAtualizacao = new Date().toISOString()
    this.httpService.post('drone/' + novaMedicao.id + '/medicoes', JSON.stringify(novaMedicao.lastMedicao)).subscribe(

    )
  }
  getDadosLastMedicao(medicoesDrone: any): Medicao{
    let ultimaMedicao = medicoesDrone.filter(x=> x.rastreamento ).sort((a,b) => a.dataAtualizacao < b.dataAtualizacao ? 1:-1)

    if (ultimaMedicao != undefined){
      return {
        latitude: ultimaMedicao[0].latitude,
        longitude: ultimaMedicao[0].longitude,
        temperatura: ultimaMedicao[0].temperatura,
        umidade: ultimaMedicao[0].umidade,
        rastreamento: ultimaMedicao[0].rastreamento,
        dataAtualizacao: ultimaMedicao[0].dataAtualizacao
      }
    }
    
  }
}
