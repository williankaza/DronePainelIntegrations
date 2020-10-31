import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ConsultaComponent } from './drone/consulta/consulta.component';
import { CadastroComponent } from './drone/cadastro/cadastro.component';
import { MonitoramentoComponent } from './monitoramento/monitoramento/monitoramento.component';

const routes: Routes = [
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
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'drone'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
