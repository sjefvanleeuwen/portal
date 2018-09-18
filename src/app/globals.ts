import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { DefaultLayoutComponent } from './containers';
import { inject } from '@angular/core/testing';

class SignalR {
    hubConnection: HubConnection;
    lastTaskData = '';
    constructor() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5051/eventhub')
            .build();
        this.hubConnection.start().catch(err => document.write('Error connecting to signalr eventhub')).then(() => {
            this.hubConnection.invoke('Subscribe', 'topic');
            this.hubConnection.invoke('Connected');
        });
    }
}

export const global = {
    signalr: new SignalR()
};
