import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro', 
  templateUrl: './cadastro.component.html', 
  styleUrls: ['./cadastro.component.scss'], 
})
export class CadastroComponent implements OnInit {
  droneId: number 
  latitude: number 
  longitude: number 
  temperature: number
  airHumidity: number 
  ngForm: any;
  constructor() { }

  ngOnInit(): void {
    this.restore();
  }

  testChange(){
    
  }

  restore() {
    this.droneId = undefined;
    this.latitude = undefined;
    this.longitude = undefined;
    this.ngForm = undefined;
    this.temperature = undefined;
    this.airHumidity = undefined;
  }

  temperatureLabel(value: number) {

    return value + 'º';
  }

  airHumidityLabel(value: number) {

    return value + '%';
  }

}


