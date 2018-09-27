import { Component, OnInit, OnDestroy } from '@angular/core';
import { Stadspas } from '../../models/dto/stadspas/stadspas';
import { BPMService, BPMMessage } from '../../services/bpm-service';
import { BPMProcessData } from '../../models/dto/bpm/bpm-process';
import { BPMNotification } from '../../models/dto/bpm/bpm-notification';
import { Subscription } from 'rxjs';
import { Topics } from '../../models/topics';
import { global } from '../../app.globals';

@Component({
  selector: 'app-stadspas-prof',
  templateUrl: 'stadspas-professional.component.html'
})
export class StadspasProfessionalComponent implements OnInit, OnDestroy {
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

  public isNewBSN(): boolean {
    return !!this.model && !global.stadspassen.find((pas) => pas.BSN === this.model.BSN);
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

        global.stadspassen.push(this.model);
      });
  }

  public resetRequestForm(): void {
    this.model = new Stadspas();
  }

  private handleMessage(msg: BPMMessage): void {
    console.log(msg.topic, JSON.stringify(msg));

    switch (msg.topic) {
      // case Topics[0] /*'dashboard-human-tasks'*/ : {
      //   break;
      // }
      case Topics[1] /*'human-task-data'*/: {
        this.model.askForInput = true;

        // TODO: TEST ONLY
        global.bsnBurger = this.model.BSN;

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
