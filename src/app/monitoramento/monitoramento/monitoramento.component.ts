import { Component, OnInit } from '@angular/core';
import { PoTableColumn, PoTableAction } from '@po-ui/ng-components';

interface Drones{
  id: string,
  latitude: number,
  longitude: number,
  temperatura: number,
  umidade: number
}


@Component({
  selector: 'app-monitoramento',
  templateUrl: './monitoramento.component.html',
  styleUrls: ['./monitoramento.component.scss']
})
export class MonitoramentoComponent implements OnInit {
  gridCols: Array<PoTableColumn> = [
    {
      label: 'id',
      property: 'id',
      visible: false
    },
    {
      label: 'Latitude',
      property: 'latitude', 
    },
    {
      label: 'Longitude',
      property: 'longitude'
    }, 
    {
      label: 'Temperatura',
      property: 'temperatura'
    },
    {
      label: 'Umidade do ar',
      property: 'umidade'
    },
    {
      label:'Acompanhar',
      type: 'button'
    }
  ]

  gridActions: Array<PoTableAction> = [
    {
      label: 'Acompanhar',
      action: this.insereDroneMap.bind(this)
    }
  ]

  listDrones: Array<Drones> = [
    {
      id: '00000001',
      latitude: 92919191,
      longitude: 312312312, 
      temperatura: -10,
      umidade: 450
    }
  ]
  constructor() { }
  insereDroneMap(teste: any){
    console.log(teste)
  }
  ngOnInit(): void {
  }

}
