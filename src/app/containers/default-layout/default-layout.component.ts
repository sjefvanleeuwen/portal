import { Component, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { navItems } from './../../_nav';
import { NotifyService, NotifyPushService } from 'ngx-notify';
import { global } from '../../globals';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})

export class DefaultLayoutComponent implements OnInit {

  lastTaskData: string;

  constructor(private _ns: NotifyService, private _nps: NotifyPushService, private cdr: ChangeDetectorRef) {
    console.log('default layout component constructor');

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  item: any = {
    type: 'success',
    title: 'ok',
    content: 'ok',
    html: `<div class="notify-title">{title}</div>
<div class="notify-content">{content}</div>
<div class="notify-icon"><img src="//angular.io/resources/images/logos/angular/angular.svg"></div>
    `,
  };

  logs: any[] = [];

  options: any = {
    progress: true,
    timeout: 1000 * 3,
    pauseOnHover: true,
    clickToClose: true,
    theme: 'default',
    rtl: false,
    className: 'my-notify',
    animate_in: 'notify-fade-in',
    animate_out: 'notify-fade-out',
    onCreate: item => {
      this.logs.push(item);
    },
    onDestroy: item => {
      this.logs.push(item);
    },
  };

  setting: any = {
    position: ['right', 'bottom'],
    offset: [20, 20],
    lastOnBottom: true,
    zIndex: 1031,
    minWidth: 300,
    maxWidth: 300,
  };
  public push: any = {
    title: '',
    body: '',
    icon: 'assets/logo.png',
    dir: 'auto',
    renotify: false,
    silent: true,
    sound: 'assets/system-fault.mp3',
  };

  onCreate(topic: string, data: string) {
    const opt = Object.assign({}, this.options);
    if (this.item.type === 'html') {
      this._ns.html(
        topic,
        data,
        'this.item.html',
        'success',
        opt,
      );
      console.log(opt);
      return;
    }
    opt.className = '';
    this._ns[this.item.type](topic, data, opt);
  }

  onSetting() {
    this._ns.success('操作', '保存成功', { timeout: 2000 });
    this._ns.updateSetting(this.setting);
  }

  onClearAll() {
    this._ns.clear();
  }
  onRequestPermission() {
    this._nps.requestPermission();
  }

  public onPushCreate(topic: string, data: string) {
    const opt = Object.assign({}, this.push);
    if (opt.renotify === true) { opt.tag = '1'; }
    this._nps.create(topic + '\r\n' + data, opt).subscribe();
  }



  ngOnInit(): void {
    global.signalr.hubConnection.on('connected', () => {
      global.signalr.hubConnection.on('publishmessage', (topic: string, message: string, data: string, processdata: string) => {
        // response on human tasks and only display new tasks
        if (topic === 'dashboard-human-tasks') {
          if (data === this.lastTaskData) {
          return;
          }
          this.lastTaskData = data;
          console.log('changes');
          this.onCreate('new human task', 'total tasks: ' + data);
        }
      });
      global.signalr.hubConnection.invoke('Subscribe', 'dashboard-human-tasks');
    });
  }
}
