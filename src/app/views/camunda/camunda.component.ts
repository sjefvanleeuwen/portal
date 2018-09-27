import ProcessDefinition from './../../models/dto/camunda/ProcessDefinition';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { global } from '../../app.globals';
import { NgxSpinnerService} from 'ngx-spinner';
import { DefaultLayoutComponent } from '../../containers/default-layout/default-layout.component';
import { SignalRService } from './../../services/signalr-service';

@Component({
  selector: 'app-camunda',
  templateUrl: './camunda.component.html',
  styleUrls: ['./camunda.component.scss']
})
export class CamundaComponent implements OnInit, OnDestroy {

  static i: any;

  countryForm: FormGroup;

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private layout: DefaultLayoutComponent,
    private signalR: SignalRService
    ) {
      console.log('construct camunda component');
  }

  processDefinitions: ProcessDefinition[];

  testTaskCompletion() {
    // tslint:disable-next-line:max-line-length
    this.signalR.hubConnection.invoke('CompleteTask', 'f1f39542-c0c6-11e8-9a1c-0242ac120004', '{"selectPass" : "PLASTIC"}').then(() => {
      alert('ok');
    });
  }

  start(process: any): void {
    console.log('start' + JSON.stringify(process));
    this.signalR.hubConnection.invoke(
      'startprocessinstance',
      'notification', 'businesskey1234',
      '{"topicid":"topic2","notificationmessage":"startprocessmessage","handleUserResponse":true}')
      .then((processId: string) => {
        this.cdr.detectChanges();
        this.layout.onCreate('Nieuw proces gestart.', 'Het <b>notification</b> proces is door u opgestart.');
       });
  }

  handleclick() {
    this.spinner.show();
    this.signalR.hubConnection.invoke('getprocessdefinitions').then((data: ProcessDefinition[]) => {
        console.log(data);
        this.layout.onCreate(data.length + ' procesdefinities voor u geladen', 'Selecteer een proces om te starten.');
       // this.countries = JSON.parse(data).tasks;
        this.processDefinitions = data;
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 250);
      });
  }

  ngOnDestroy(): void {
  }

  ngOnInit() {
    const me = this;
    this.layout.HumanTask.subscribe((data: any) => {
      me.layout.Tasks.push(data);
    });

    this.countryForm = this.fb.group({
      processControl: []
    });

    this.countryForm.valueChanges.subscribe((data) => {
      console.log('changes....' + JSON.stringify(data));
    });
  }
}
