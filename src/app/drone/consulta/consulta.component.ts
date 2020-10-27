import { Component, OnInit } from '@angular/core';
import { PoTableAction } from '@po-ui/ng-components';
import { PoTableColumn } from '@po-ui/ng-components';

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
      label:'Alterar',
      type: 'button'
    },
    {
      label:'Excluir',
      type: 'button'
    }
  ]

  gridActions: Array<PoTableAction> = [
    {
      label: 'Acompanhar',
      action: this.ngOnInit.bind(this)
    },
    {
      label: 'Excluir',
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
  constructor() { }

  ngOnInit(): void { 
  }
}
