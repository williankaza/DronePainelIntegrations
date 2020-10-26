import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap,  } from '@angular/google-maps';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-monitoramento-v2',
  templateUrl: './monitoramento-v2.component.html',
  styleUrls: ['./monitoramento-v2.component.scss']
})
export class MonitoramentoV2Component implements OnInit {
  apiLoaded: Observable<any>;

  @ViewChild("maps", { static: true }) googleMaps: GoogleMap;

  constructor(httpClient: HttpClient) {
    
  }

  ngOnInit(): void {
    this.initMap()
  }
  initMap(): void {
    let initPos: google.maps.LatLng = new google.maps.LatLng(-23.574116, -46.623216)
    this.googleMaps.center = initPos;
    this.googleMaps.zoom = 18
  }

  insertMarksCluster(){
    
  }
}
