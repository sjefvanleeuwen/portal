import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Stadspas } from '../../models/dto/stadspas/stadspas';
import { BPMService, BPMMessage } from '../../services/bpm-service';
import { Subscription } from 'rxjs';
import { Topics } from '../../models/topics';
import { global } from '../../app.globals';

@Component({
  selector: 'app-stadspas-burger',
  templateUrl: 'stadspas-burger.component.html'
})
export class StadspasBurgerComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public model: Stadspas;

  // @Input()
  public bsn: number;

  constructor(private bpm: BPMService) {
    this.subscription = this.bpm.getMessage()
      .subscribe( msg => this.handleMessage(msg));
  }

  ngOnInit() {
    if (global.loggedInUser && global.loggedInUser.isInwoner) {
      this.bsn = global.loggedInUser.bsn;
    }

    if (this.bsn) {
      this.bpm.subscribeForCityPass(this.bsn);

      this.model = global.stadspassen.find((pass) => pass.BSN === this.bsn);
    }

    // TODO: remove test code
    if (!this.model) {

      this.model = new Stadspas();
      this.model.BSN =  123456;
      this.model.askForInput = true;
      //this.model.activatedAt = new Date();
      this.model.notificationDataBRP = {};
      this.model.notificationDataBRP.geslachtsaanduiding = 'M';
      this.model.notificationDataBRP.voorvoegselGeslachtnaam = 'van der   ';
      this.model.notificationDataBRP.voornamen = 'Piet';
      this.model.notificationDataBRP.voorletterAanschrijving = 'P.';
      this.model.notificationDataBRP.geslachtsnaam = 'Wit';
      this.model.notificationDataBRP.geboorteDatum = new Date(1967, 4, 15);
      this.model.notificationDataBRP.verblijfadres = {};
      this.model.notificationDataBRP.verblijfadres.straatnaam = 'Straatweg';
      this.model.notificationDataBRP.verblijfadres.huisnummer = '14';
      this.model.notificationDataBRP.verblijfadres.postcode = '2222 DG';
      this.model.notificationDataBRP.verblijfadres.woonplaatsnaam = 'Haarlem';
      this.model.notificationDataBRP.partner = {};
      this.model.notificationDataBRP.partner.geslachtsaanduiding = 'V';
      this.model.notificationDataBRP.partner.voorvoegselGeslachtnaam = 'de';
      this.model.notificationDataBRP.partner.voornamen = 'Femke';
      this.model.notificationDataBRP.partner.voorletterAanschrijving = 'F.';
      this.model.notificationDataBRP.partner.geslachtsnaam = 'Vries';
      this.model.notificationDataBRP.partner.geboorteDatum = new Date(1963, 7, 25);
    }
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  public submitChoiceForm() {
    console.log(`Choice submitted for BSN ${this.model.BSN} choice is ${this.model.cardType}`);

    const payload: any = { selectPass : this.model.cardType };
    this.bpm
      .completeProcess(this.model.process.Id, JSON.stringify(payload))
      .then(() => {
        console.log('Process completed');

        this.model.userChoiceAt = new Date();
      });
  }

  public resetChoiceForm(): void {
    console.log('Form reset');
    this.model.cardType = undefined;
  }

  private myBrpTopic(): string {
    return `city-pass-${this.bsn}`;
  }

  private handleMessage(msg: BPMMessage): void {
    console.log(msg.topic, JSON.stringify(msg));

    switch (msg.topic) {
      // case Topics[0] /*'dashboard-human-tasks'*/ : {
      //   break;
      // }
      case Topics[1] /*'human-task-data'*/: {
        this.model.askForInput = true;
        break;
      }
      case this.myBrpTopic(): {
        console.log(JSON.stringify(msg));

        // TODO: Show Document

        break;
      }
      default: {
        console.log(msg);
      }
    }
  }
}
