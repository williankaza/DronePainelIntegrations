import { Component, OnInit, ViewChild } from '@angular/core';
import { PoTableColumn, PoTableAction, PoTableDetail } from '@po-ui/ng-components';
import { MouseEvent, AgmCoreModule } from '@agm/core';
import { Observable } from 'rxjs';
import { GoogleMap } from '@angular/google-maps';
import { HttpService } from 'src/app/services/http.service';

interface Medicoes{
  id: number,
  lat: number,
  lng: number,
  umidade?: number,
  temperatura?: number,
  dataAtualizacao?: string
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
      { property: 'temperatura', label: 'Temperatura', type: 'number' },
      { property: 'dataAtualizacao', label: 'Data atualização', type: 'string'}
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
  
  listDrones: Array<Drones>
  
  constructor(private httpService: HttpService) {
    this.listDrones = new Array()
   }

  ngOnInit(): void {
    this.initMap()
    this.loadGrid()
  }

  loadGrid(){
    this.httpService.restore();
    this.httpService.get('drones').subscribe((response)=>{
      response.forEach(drone => {
        let medicoes = drone.medicoes
        let lastMedicaoIndex = Math.max(...medicoes.filter(medicao => medicao.rastreamento).map(medicao => medicao.idMedicao))-1
        
        if (lastMedicaoIndex > -1){
          let newDrone: Drones = {
            id: drone.idDrone,
            latitude: drone.medicoes[lastMedicaoIndex].latitude,
            longitude: drone.medicoes[lastMedicaoIndex].longitude,
            temperatura: drone.medicoes[lastMedicaoIndex].temperatura,
            umidade: drone.medicoes[lastMedicaoIndex].umidade,
            medicoes: (<Array<any>>drone.medicoes).filter(medicao => medicao.rastreamento).map((medicao)=>{
              return <Medicoes> {
                id: medicao.idMedicao,
                lat: medicao.latitude,
                lng: medicao.longitude,
                temperatura: medicao.temperatura,
                umidade: medicao.umidade,
                dataAtualizacao: new Date(medicao.dataAtualizacao).toLocaleString()
              }            
            })
          }
          
          this.listDrones.push(newDrone)
        }
      });
    })
  }

  insertGMPApiKey(key: string){
    AgmCoreModule.forRoot({
      apiKey: key
    })
  }
  
  initMap(): void {
    let initPos: google.maps.LatLng = new google.maps.LatLng(-23.574116, -46.623216)
    this.googleMaps.center = initPos;
    this.googleMaps.zoom = 2
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
        lng: item.lng,
      }

      this.vertices = [...this.vertices, novaMarcacao]
    })
  }
}
