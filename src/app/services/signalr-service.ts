import { AuthService } from './auth-service';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { global } from '../app.globals';

@Injectable({
    providedIn: 'root',
  })
export class SignalRService {
    hubConnection: HubConnection;

    constructor() {
        console.log('SignalRService Constructed');
    }

    public connect(): void {
        console.log('signalRService connect()');
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5051/eventhub',
            {
                accessTokenFactory: () => global.loggedInUser.token
            })
            .build();
            this.hubConnection
                .start()
                .catch(err => document.write('Error connecting to signalr eventhub'))
                .then(() => {
                    this.hubConnection.invoke('connected');
            });
    }
}
