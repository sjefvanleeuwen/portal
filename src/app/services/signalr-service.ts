import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
    providedIn: 'root',
  })
export class SignalRService {
    hubConnection: HubConnection;
    auth: HubConnection;

    token = '';

    getAccessToken(userName: string, password: string) {
        this.auth
        .start()
        .catch(err => document.write('Error connecting to signalr authenticationhub'))
        .then(() => {
            this.auth.invoke('authenticate', userName, password).then((user) => {
                console.log('authenticate token: ' + user.token);
                this.token = user.token;
                this.hubConnection = new HubConnectionBuilder()
                    .withUrl('http://localhost:5051/eventhub',
                    {
                        accessTokenFactory: () => this.token
                    })
                .build();
                this.hubConnection
                .start()
                .catch(err => document.write('Error connecting to signalr eventhub'))
                .then(() => {
                    this.auth.invoke('connected');
                });
            });
        });
    }

    constructor() {
        console.log('SignalRService Constructed');
        this.auth = new HubConnectionBuilder()
        .withUrl('http://localhost:5051/authenticationhub')
        .build();
    }

    public connect(): void {
        console.log('signalRService connect()');
        this.getAccessToken('serviceaccount', 'test');
        // this.hubConnection
        //     .start()
        //     .catch(err => document.write('Error connecting to signalr eventhub'))
        //     .then(() => {
        //         this.hubConnection.invoke('Connected');
        //     });
    }
}
