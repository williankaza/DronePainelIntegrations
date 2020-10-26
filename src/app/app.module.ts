import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MonitoramentoComponent } from './monitoramento/monitoramento/monitoramento.component';
import { ConsultaComponent } from './drone/consulta/consulta.component';
import { CadastroComponent } from './drone/cadastro/cadastro.component';
import { MatMenuModule } from "@angular/material/menu";
import { MatSliderModule } from "@angular/material/slider";
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import { MonitoramentoV2Component } from './monitoramento-v2/monitoramento-v2.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    MonitoramentoComponent,
    ConsultaComponent,
    CadastroComponent,
    MonitoramentoV2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatSliderModule,
    FormsModule,
    PoModule,
    GoogleMapsModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      
    }),
    RouterModule.forRoot([])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
