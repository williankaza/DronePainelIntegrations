import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-monitoramento-v2',
  templateUrl: './monitoramento-v2.component.html',
  styleUrls: ['./monitoramento-v2.component.scss']
})
export class MonitoramentoV2Component implements OnInit {
  apiLoaded: Observable<any>;
  markerOptions: google.maps.MarkerOptions = {draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  vertices: google.maps.LatLngLiteral[] = [
  ];
  @ViewChild("maps", { static: true }) googleMaps: GoogleMap;
  @ViewChild("mapsPolyline", { static: false }) mapsPolyline: google.maps.Polyline
  @ViewChild("mapsMarker", { static: false }) mapsMarker: google.maps.Marker

  constructor(httpClient: HttpClient) {
    
  }

  ngOnInit(): void {
    this.initMap()
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

  insertMarksCluster(){
    this.vertices = [...this.vertices, { lat: 1 * (Math.random() * 100),
      lng: 1 * (Math.random() * 100)}]
  }
}
