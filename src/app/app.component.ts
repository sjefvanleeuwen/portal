import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MessageService } from './services/message.service';
import { interval, Subject } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private service: MessageService) {
    this.a.subscribe(n => this.sendMessage());
   }

   a = interval(1000);

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.service.sendMessage('Message from app Component to message Component!');
  }

  clearMessage(): void  {
    this.service.clearMessage();
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
