import { Component, OnInit } from '@angular/core';
import { PoTableColumn, PoTableAction } from '@po-ui/ng-components';
import { MouseEvent, AgmCoreModule } from '@agm/core';

interface Drones{
  id: string,
  latitude: number,
  longitude: number,
  temperatura: number,
  umidade: number
}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
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
      label: 'Temperature',
      property: 'temperatura'
    },
    {
      label: 'Air Humidity',
      property: 'umidade'
    },
    {
      label:'Follow',
      type: 'button'
    }
  ]

  gridActions: Array<PoTableAction> = [
    {
      label: 'Follow',
      action: this.insereDroneMap.bind(this)
    }
  ]

  listDrones: Array<Drones> = [
    {
      id: '00000001',
      latitude: 61.673858,
      longitude: 27.815982, 
      temperatura: -10,
      umidade: 450
    },
    {
      id: '00000002',
      latitude: 41.673858,
      longitude: 7.815982, 
      temperatura: -10,
      umidade: 450
    },
    {
      id: '00000003',
      latitude: 1.673858,
      longitude: 57.815982, 
      temperatura: -10,
      umidade: 450
    },
    {
      id: '00000004',
      latitude: 11.673858,
      longitude: -27.815982, 
      temperatura: -10,
      umidade: 450
    }
  ]
  constructor() { }

  insereDroneMap(teste: any){
    console.log(teste)
    this.markers.push({
      draggable: false,
      label: teste['id'],
      lat: teste['latitude'],
      lng: teste['longitude']
    })
  }

  ngOnInit(): void {
    
  }
  insertGMPApiKey(key: string){
    AgmCoreModule.forRoot({
      apiKey: key
    })
  }

// google maps zoom level
zoom: number = 8;
  
// initial center position for the map
lat: number = 51.673858;
lng: number = 7.815982;

clickedMarker(label: string, index: number) {
  console.log(`clicked the marker: ${label || index}`)
}

mapClicked($event: MouseEvent) {
  this.markers.push({
    lat: $event.coords.lat,
    lng: $event.coords.lng,
    draggable: true
  });
}

markerDragEnd(m: marker, $event: MouseEvent) {
  console.log('dragEnd', m, $event);
}

markers: marker[] = [
  
]

}
