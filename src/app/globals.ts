import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

class signalr {
    hubConnection: HubConnection;
    constructor(){
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5051/eventhub')
            .build();
        this.hubConnection.start().catch(err => document.write(err)).then(() => {
            this.hubConnection.invoke('Subscribe', 'topic');
     });
    }
};
  
export const global = {
    signalr: new signalr()
};
