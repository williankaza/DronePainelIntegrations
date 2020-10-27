import { Component, OnInit, ViewChild } from '@angular/core';
import { PoTableColumn, PoTableAction } from '@po-ui/ng-components';
import { MouseEvent, AgmCoreModule } from '@agm/core';
import { Observable } from 'rxjs';
import { GoogleMap } from '@angular/google-maps';

interface Medicoes{
  id: number,
  lat: number,
  lng: number
}

interface Drones{
  id: string,
  latitude: number,
  longitude: number,
  temperatura: number,
  umidade: number,
  medicoes: Medicoes[]
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
  apiLoaded: Observable<any>;
  markerOptions: google.maps.MarkerOptions = {draggable: false };
  polylineOptions: google.maps.PolylineOptions = { 
    geodesic: false,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  }
  vertices: google.maps.LatLngLiteral[] = [
  ];
  @ViewChild("maps", { static: true }) googleMaps: GoogleMap;
  @ViewChild("mapsPolyline", { static: false }) mapsPolyline: google.maps.Polyline
  @ViewChild("mapsMarker", { static: false }) mapsMarker: google.maps.Marker
  
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
      action: (row)=>{ 
        this.insertMarksCluster(row)
      }
    }
  ]

  listDrones: Array<Drones> = [
    {
      id: '00000001',
      latitude: 61.673858,
      longitude: 27.815982, 
      temperatura: -10,
      umidade: 450,
      medicoes: [
        {
          id: 1,
          lat: 21.023232,
          lng: -12.23231
        },{
          id: 2,
          lat: 37.10041,
          lng: 21.5847
        },{
          id: 3,
          lat: -21.023232,
          lng: -12.23231
        },{
          id: 4,
          lat: 70.023232,
          lng: 22.23231
        },
      ]
    },
    {
      id: '00000002',
      latitude: 41.673858,
      longitude: 7.815982, 
      temperatura: -10,
      umidade: 450,
      medicoes: [
        {
          id: 1,
          lat: 35.6762,
          lng: 139.6503
        },{
          id: 2,
          lat: -23.5505,
          lng: -46.6333
        },{
          id: 3,
          lat: 43.6532,
          lng: -79.3832
        },{
          id: 4,
          lat: 51.5074,
          lng: 0.1278
        },
      ]
    },
    {
      id: '00000003',
      latitude: 1.673858,
      longitude: 57.815982, 
      temperatura: -10,
      umidade: 450,
      medicoes: [
        {
          id: 1,
          lat: 21.023232,
          lng: -12.23231
        },{
          id: 2,
          lat: 7.10041,
          lng: -1.5847
        },{
          id: 3,
          lat: 21.023232,
          lng: -12.23231
        },{
          id: 4,
          lat: 21.023232,
          lng: -12.23231
        },
      ]
    },
    {
      id: '00000004',
      latitude: 11.673858,
      longitude: -27.815982, 
      temperatura: -10,
      umidade: 450,
      medicoes: [
        {
          id: 1,
          lat: 21.023232,
          lng: -12.23231
        },{
          id: 2,
          lat: 7.10041,
          lng: -1.5847
        },{
          id: 3,
          lat: 21.023232,
          lng: -12.23231
        },{
          id: 4,
          lat: 21.023232,
          lng: -12.23231
        },
      ]
    }
  ]
  constructor() { }

  ngOnInit(): void {
    this.initMap()
  }
  insertGMPApiKey(key: string){
    AgmCoreModule.forRoot({
      apiKey: key
    })
  }
  initMap(): void {
    let initPos: google.maps.LatLng = new google.maps.LatLng(-23.574116, -46.623216)
    this.googleMaps.center = initPos;
    this.googleMaps.zoom = 4
    this.googleMaps.mapTypeId = google.maps.MapTypeId.SATELLITE
    this.googleMaps.width = '100%'
    this.googleMaps.height = '100%'

  }
  initMarker(){
    this.vertices = [
      {lat: 13, lng: 13},
      {lat: -13, lng: 0},
      {lat: 13, lng: -13},
    ];
  }

  insertMarksCluster(row: Drones){
    this.vertices = []
    row.medicoes.forEach((item)=>{
      let novaMarcacao: google.maps.LatLngLiteral = {
        lat: item.lat,
        lng: item.lng
      }

      this.vertices = [...this.vertices, novaMarcacao]
    })
  }
}
