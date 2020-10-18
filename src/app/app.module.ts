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

@NgModule({
  declarations: [
    AppComponent,
    MonitoramentoComponent,
    ConsultaComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatSliderModule,
    PoModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
