import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  // SignalR
  public SignalRData: Array<any> = [
    {
      data: [25, 59, 84, 84, 51, 55, 40],
      label: 'Series A'
    }
  ];

  public SignalRNotifications: any = 0;

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

  public hubConnection: HubConnection;

  ngOnInit(): void {

    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5051/eventhub')
      .build();

    this.hubConnection.start().catch(err => document.write(err)).then(() => {
      this.hubConnection.invoke('Subscribe', 'topic');
    });

    this.hubConnection.on('publishmessage', (topic: string, message: string) => {
      this.SignalRNotifications++;
      console.log(topic + ': ' + message);
    });
  }
}
