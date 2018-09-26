import { Component, OnInit, OnDestroy } from '@angular/core';
import { Stadspas } from './../../models/dto/stadspas/stadspas';
import { BPMService, BPMMessage } from './../../services/bpm-service';
import { BPMProcessData } from './../../models/dto/bpm/bpm-process';
import { BPMNotification } from './../../models/dto/bpm/bpm-notification';
import { Subscription } from 'rxjs';
import { Topics } from './../../models/topics';
import { StadspasListComponent } from './stadspas-list.component';

@Component({
  templateUrl: 'stadspas-individual.component.html'
})
export class StadspasComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public model: Stadspas = new Stadspas();

  constructor(private bpm: BPMService) {
    this.subscription = this.bpm.getMessage()
      .subscribe( msg => this.handleMessage(msg));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  public submitRequestForm(): void {
    console.log(`Request submitted for BSN ${this.model.BSN}`);

    const payload: any = { bsn: this.model.BSN };
    this.bpm
      .startProcess('brp', '', JSON.stringify(payload))
      .then((processId: string) => {
        console.log('Started process Id: ' + processId);

        this.model.process.Id = processId;
        this.model.requestedAt = new Date();
      });
  }

  public submitChoiceForm() {
    console.log(`Choice submitted for BSN ${this.model.BSN} choice is ${this.model.cardType}`);

    const payload: any = { selectPass : this.model.cardType };
    this.bpm
      .completeProcess(this.model.process.Id, JSON.stringify(payload))
      .then(() => {
        console.log('Process continued: ');

        //this.model.askForInput = false;
        this.model.userChoiceAt = new Date();
      });
  }

  public resetForm(): void {
    console.log('Form reset');
    this.model = new Stadspas();
  }

  private handleMessage(msg: BPMMessage): void {
    switch (msg.topic) {
      case Topics[0] /*'dashboard-human-tasks'*/ : {
        console.log(Topics[0], JSON.stringify(msg));

        break;
      }
      case Topics[1] /*'human-task-data'*/: {
        console.log(Topics[1], JSON.stringify(msg));

        this.model.askForInput = true;

        break;
      }
      case Topics[2] /*'city-pass-municipality'*/: {
        const notificationMsg: BPMNotification = (<BPMNotification>msg);

        console.log('Topic: ', notificationMsg.topic);
        console.log('Msg: ', notificationMsg.message);
        if (notificationMsg.data) {
          console.log('Data value', JSON.parse((notificationMsg).data).value);
        }
        console.log('Process data', notificationMsg.processdata);
        if (notificationMsg.processdata) {
          console.log('Process data value', JSON.parse(notificationMsg.processdata));
        }

        // store last notifcation
        if (notificationMsg.message.toLowerCase() === 'brp-push-data') {
          console.log('BRP DATA');

          if (notificationMsg.data) {
            this.model.notificationDataBRP = JSON.parse(notificationMsg.data).value;
          } else {
            this.model.notificationDataBRP = null;
          }
        } else if (notificationMsg.message.toLowerCase() === 'passselected') {
          console.log('PASS DATA');

          if (notificationMsg.data) {
            this.model.notificationDataPass = JSON.parse(notificationMsg.data).value;
          } else {
            this.model.notificationDataPass = null;
          }

          this.model.activatedAt = new Date();
        }

        // store process data
        if (notificationMsg.processdata) {
          this.model.processData = <BPMProcessData>JSON.parse(notificationMsg.processdata);
        }

        break;
      }
      // case Topics[3] /*'city-pass-${bsn}'*/: {
      //   console.log(Topics[3], JSON.stringify(msg));
      //   break;
      // }
      default: {
        console.log(msg);
      }
    }
  }
}
