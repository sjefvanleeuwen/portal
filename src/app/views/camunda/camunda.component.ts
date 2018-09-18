import ProcessDefinition from './../../models/dto/camunda/ProcessDefinition';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { global } from '../../globals';
import { NgxSpinnerService} from 'ngx-spinner';
import { DefaultLayoutComponent } from '../../containers/default-layout/default-layout.component';

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
    private layout: DefaultLayoutComponent
    ) {

      console.log('construct camunda component');

    }

  processDefinitions: ProcessDefinition[];
  start(): void {
    console.log('start');
    global.signalr.hubConnection.invoke(
      'startprocessinstance',
      'notification', 'businesskey1234',
      '{"topicid":"topic2","notificationmessage":"startprocessmessage","handleUserResponse":true}')
      .then((processId: string) => {
        this.cdr.detectChanges();
        this.layout.onCreate('started process', 'The notification process has been started on the Camunda BPM server.');
       });
  }

  handleclick() {
    this.spinner.show();
    global.signalr.hubConnection.invoke('getprocessdefinitions').then((data: ProcessDefinition[]) => {
        console.log(data);
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

    this.countryForm = this.fb.group({
      countryControl: ['Canada22']
    });

    // global.signalr.hubConnection.on('connected', (clientId) => {
    //   console.log('connected');

    // });


  }
}
