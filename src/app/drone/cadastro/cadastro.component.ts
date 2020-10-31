import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Generics } from 'src/app/core/generics';
import { PoNotification, PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-cadastro', 
  templateUrl: './cadastro.component.html', 
  styleUrls: ['./cadastro.component.scss'], 
})
export class CadastroComponent implements OnInit {
  droneId: number = 1
  latitude: number = 0
  longitude: number = 0
  temperature: number = 0
  airHumidity: number = 0
  enabled: boolean = true
  ngForm: any;
  legendaBotao: string = "Enable Tracking"
  blockSave: boolean = false

  constructor(private httpService: HttpService, 
    private poNotification: PoNotificationService,
    private router: Router, 
    private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.restore();
    let droneId = this.route.snapshot.paramMap.get("codDrone");

    if (droneId != null){
      this.droneId = parseInt(droneId)
      this.getDrone(this.droneId)
    } else {
      this.initDadosDrone()
    }
  }

  initDadosDrone(){
    this.airHumidity = 50
    this.temperature = 0
    this.latitude = 0
    this.longitude = 0
    this.enabled = true
  }

  getDrone(idDrone: number){
    this.httpService.get('drones').subscribe(
      (response)=>{
        response.forEach(drone => {
          if (drone.idDrone == this.droneId){
            let ultimaMedicao = Generics.getDadosLastMedicao(drone.medicoes)

            if (ultimaMedicao != undefined){
              this.airHumidity = ultimaMedicao.umidade
              this.temperature = ultimaMedicao.temperatura
              this.latitude = ultimaMedicao.latitude
              this.longitude = ultimaMedicao.longitude
              this.enabled = ultimaMedicao.rastreamento
            }
          }
        });
      }
    )
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

  createBodyNewDrone(): BodyCadastro{
    return {
      idDrone : this.droneId,
      latitude: this.latitude,
      longitude: this.longitude,
      temperatura: this.temperature,
      umidade: this.airHumidity,
      dataAtualizacao: new Date().toISOString(),
      rastreamento: this.enabled
    }
  }

  goBack(){
    this.router.navigateByUrl('/drone')
  }

  salvar(){
    this.blockSave = true
    let json = this.createBodyNewDrone()
    if (this.validaDados()){
      this.httpService.post('drone', JSON.stringify(json), 'med/').subscribe(
        response=>{ 
          this.blockSave = false  
          this.poNotification.success("A ultima posição do Drone foi atualizada com sucesso!")
        }
      )
    } else {
      this.blockSave = false
    }
  }

  validaDados(){
    let lOk: boolean = true
    if (this.droneId == undefined){
      this.poNotification.error("Informe um código para o Drone!")
      lOk = false;
    }

    if (this.latitude < -90 || this.latitude > 90 ){
      this.poNotification.error("A latitude tem de estar entre -90º e 90º!")
      lOk = false
    }

    if (this.longitude < -180 || this.longitude > 180 ){
      this.poNotification.error("A longitude tem de estar entre -180º e 180º!")
      lOk = false
    }

    return lOk
  }
}

interface BodyCadastro {
  idDrone: number,
  latitude: number,
  longitude: number,
  temperatura: number,
  umidade: number,
  dataAtualizacao: string,
  rastreamento: boolean
}