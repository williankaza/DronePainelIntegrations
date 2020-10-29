import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  enabled: boolean = true
  ngForm: any;
  legendaBotao: string = "Enable Tracking"
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.restore();
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

  createBodyNewDrone(){
    return {
      "idDrone": this.droneId,
      "latitude": this.latitude,
      "longitude": this.longitude,
      "temperatura": this.temperature,
      "umidade": this.airHumidity,
      "dataAtualizacao": new Date().toISOString(),
      "rastreamento": this.enabled
    }
  }
  
  createBodyUpdateDrone(){
    return {
      "latitude": this.latitude,
      "longitude": this.longitude,
      "temperatura": this.temperature,
      "umidade": this.airHumidity,
      "dataAtualizacao": new Date().toISOString(),
      "rastreamento": this.enabled
    }
  }

  goBack(){
    this.router.navigateByUrl('/drone')
  }
}


