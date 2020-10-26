import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoramentoV2Component } from './monitoramento-v2.component';

describe('MonitoramentoV2Component', () => {
  let component: MonitoramentoV2Component;
  let fixture: ComponentFixture<MonitoramentoV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoramentoV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoramentoV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
