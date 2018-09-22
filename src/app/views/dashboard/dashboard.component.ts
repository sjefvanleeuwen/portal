import { BrpPersoon } from './../../models/dto/brp/brpPersoon';
import { Component, OnInit, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { global } from '../../globals';
import { Subscription } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  public HumanTasks: string;

  public SignalRData: Array<any> = [
    {
      data: [25, 59, 84, 84, 51, 55, 40],
      label: 'Series A'
    }
  ];
  message: any;
  subscription: Subscription;
  public SignalRNotifications: any = 0;
  public SignalRNotificationsData: any = '';
  public SignalRNotificationsData2: any = '';

  public SignalRLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public SignalROptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 40 - 5,
          max: 84 + 5,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public SignalRColours: Array<any> = [
    {
      backgroundColor: getStyle('--primary'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public SignalRLegend = false;
  public SignalRType = 'line';

  a: any;

  public processData = '';

  public choicePass(): void {
    const o = JSON.parse(this.processData);
    o.passChoice = 1;
    global.signalr.hubConnection.invoke('publishmessage', 'humanTask', '', JSON.stringify(o), this.processData);
  }

  setHumanTasks(value: string): void {
    this.HumanTasks = value;
  }
  constructor() {
   // this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; console.log('message');});

    // global.signalr.hubConnection.on('publishmessage', (topic: string, message: string, data: string, processdata: string) => {
    //   this.HumanTasks = data;
    //   if (topic = 'dashboard-human-tasks') {
    //     console.log(topic + ': okthen' + processdata + ': ' + message + ' -> ' + data);
    //   }
    //  });

  }


  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    // global.signalr.hubConnection.on('connected', () => {
      // this.HumanTasks = 'connected';
      // global.signalr.hubConnection.invoke('Subscribe', 'dashboard-human-tasks');
   // });

    // global.signalr.hubConnection = new HubConnectionBuilder()
    // .withUrl('http://localhost:5051/eventhub')
    // .build();
    // this.hub.start().catch(err => document.write('Error connecting to signalr eventhub')).then(() => {
    //   console.log('connected');
    //   this.hub.invoke('Subscribe', 'dashboard-human-tasks');
    // });

    console.log('on init');

      // this.SignalRNotifications++;
      // this.processData = processdata;
      // console.log(topic + ': ' + processdata + ': ' + message + ' -> ' + data);
      // const p = JSON.parse(data);
      // this.SignalRNotificationsData = p.value.voornamen + ' ' + p.value.geslachtsnaam;
      // this.SignalRNotificationsData2 = p.value.partner[0].voornamen + ' ' + p.value.geslachtsnaam;
  }
}
