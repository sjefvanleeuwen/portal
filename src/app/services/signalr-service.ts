import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
    providedIn: 'root',
  })
export class SignalRService {
    hubConnection: HubConnection;

    constructor() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5051/eventhub')
            .build();
    }

    public connect(): void {
        this.hubConnection
            .start()
            .catch(err => document.write('Error connecting to signalr eventhub'))
            .then(() => {
                this.hubConnection.invoke('Subscribe', 'topic');
                this.hubConnection.invoke('Connected');
            });
    }
}
