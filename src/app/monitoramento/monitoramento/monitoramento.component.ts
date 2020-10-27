import { Component, OnInit, ViewChild } from '@angular/core';
import { PoTableColumn, PoTableAction, PoTableDetail } from '@po-ui/ng-components';
import { MouseEvent, AgmCoreModule } from '@agm/core';
import { Observable } from 'rxjs';
import { GoogleMap } from '@angular/google-maps';

interface Medicoes{
  id: number,
  lat: number,
  lng: number,
  umidade?: number,
  temperatura?: number
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
    strokeColor: "#FFAC2B",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  }
  vertices: google.maps.LatLngLiteral[] = [
  ];
  @ViewChild("maps", { static: true }) googleMaps: GoogleMap;
  @ViewChild("mapsPolyline", { static: false }) mapsPolyline: google.maps.Polyline
  @ViewChild("mapsMarker", { static: false }) mapsMarker: google.maps.Marker
  
  medicaoDetail: PoTableDetail = {
    columns: [
      { property: 'id', label: 'Sequencial' },
      { property: 'lat', label: 'Latitude', type: 'number'},
      { property: 'lng', label: 'Longitude', type: 'number' },
      { property: 'umidade', label: 'Umidade', type: 'number' },
      { property: 'temperatura', label: 'Temperatura', type: 'number' }
    ], 
    typeHeader: 'top'
  };

  gridCols: Array<PoTableColumn> = [
    {
      label: 'Drone',
      property: 'id',
      visible: true
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
    },
    { property: 'medicoes', label: 'Details', type: 'detail', detail: this.medicaoDetail }
  ]

  gridActions: Array<PoTableAction> = [
    {
      label: 'Follow',
      action: (row)=>{
        this.insertMarksCluster(row)
      }
    }
  ]
  
  listDrones: Array<Drones> = [
    {
      id: '00000001',
      latitude: 34.5199,
      longitude: -105.8701, 
      temperatura: -10,
      umidade: 450,
      medicoes: [
        {
          id: 1,
          lat: 41.3851,
          lng: 2.1734
        },{
          id: 2,
          lat: -30.5595,
          lng: 22.9375
        },{
          id: 3,
          lat: -34.6037,
          lng: -58.3816
        },{
          id: 4,
          lat: 34.5199,
          lng: -105.8701
        },
      ]
    },
    {
      id: '00000002',
      latitude: 51.5074,
      longitude: 0.1278, 
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
      latitude: 10.4806,
      longitude: -66.9036, 
      temperatura: -10,
      umidade: 450,
      medicoes: [
        {
          id: 1,
          lat: 25.2048,
          lng: 55.2708
        },{
          id: 2,
          lat: 31.7917,
          lng: -7.0926
        },{
          id: 3,
          lat: 21.023232,
          lng: -12.23231
        },{
          id: 4,
          lat: 10.4806,
          lng: -66.9036
        },
      ]
    },
    {
      id: '00000004',
      latitude: 64.2008,
      longitude: -149.4937, 
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
          lat: -33.8688,
          lng: 151.2093
        },{
          id: 4,
          lat: 64.2008,
          lng: -149.4937
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
