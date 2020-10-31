import { Component } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private router: Router, private route: ActivatedRoute){ }

  readonly menus: Array<PoMenuItem> = [
    { label: 'Monitoramento', action: this.goToMonitoramento.bind(this), icon:"po-icon-world", shortLabel:"Monitor" },
    { label: 'Cadastro', action: this.goToCadastro.bind(this), icon:"po-icon-archive", shortLabel: "Register" }
  ];

  private goToMonitoramento() {
    this.router.navigate(['./monitoramento'], { relativeTo: this.route})
  }

  private goToCadastro(){
    this.router.navigate(['./drone'], { relativeTo: this.route})
  }
}