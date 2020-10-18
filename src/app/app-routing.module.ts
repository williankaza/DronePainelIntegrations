import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ConsultaComponent } from './drone/consulta/consulta.component';
import { CadastroComponent } from './drone/cadastro/cadastro.component';
import { MonitoramentoComponent } from './monitoramento/monitoramento/monitoramento.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AppComponent
  },
  {
    path: 'monitoramento',
    component: MonitoramentoComponent
  },
  {
    path: 'drone',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ConsultaComponent
      },
      {
        path: 'cadastro',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: CadastroComponent
          },
          {
            path: ':codDrone',
            component: CadastroComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
