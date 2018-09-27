import { Injectable } from '@angular/core';
import { SignalRService } from './signalr-service';
import { Observable, Subject } from 'rxjs';
import { Topics } from './../models/topics';

export class BPMMessage {
    topic: string;
    message: string;
    data: string;
    processdata: string;
}

@Injectable({
    providedIn: 'root',
  })
export class BPMService {

    constructor(private signalR: SignalRService) {
    }

    private subject = new Subject<BPMMessage>();

    private sendMessage(message: BPMMessage) {
        this.subject.next(message);
    }

    private clearMessage() {
        this.subject.next();
    }

    public getMessage(): Observable<BPMMessage> {
        return this.subject.asObservable();
    }

    public subscribeForBsn(bsn: number) {
        console.log('BPMService constructed');
        this.signalR.hubConnection.on('Connected', () => {
            this.signalR.hubConnection.on('publishmessage', this.handlePublishedMessage);
            // subscribe to events, so the user interface can update.
            console.log('client subscribing: ' + Topics[0]);
            console.log('client subscribing: ' + Topics[1]);
            console.log('client subscribing: ' + Topics[2]);
            this.signalR.hubConnection.invoke('Subscribe', Topics[0]).then(() => {
                this.signalR.hubConnection.invoke('Subscribe', Topics[1]).then(() => {
                    this.signalR.hubConnection.invoke('Subscribe', `city-pass-${bsn}`);
                });
            });
          });

          this.signalR.connect();
    }

    public subscribeForMunicipality() {
        console.log('BPMService constructed');
        this.signalR.hubConnection.on('Connected', () => {
            this.signalR.hubConnection.on('publishmessage', this.handlePublishedMessage);
            // subscribe to events, so the user interface can update.
            console.log('client subscribing: ' + Topics[0]);
            console.log('client subscribing: ' + Topics[1]);
            console.log('client subscribing: ' + Topics[2]);
            this.signalR.hubConnection.invoke('Subscribe', Topics[0]).then(() => {
                this.signalR.hubConnection.invoke('Subscribe', Topics[1]).then(() => {
                    this.signalR.hubConnection.invoke('Subscribe', Topics[2]);
                });
            });
          });

          this.signalR.connect();
    }

    public startProcess(processDefinitionName: string, referenceNo: string, payload: any): Promise<any> {
        return this.signalR.hubConnection.invoke(
            'startprocessinstance',
            processDefinitionName,
            referenceNo,
            payload);
    }

    public completeProcess(processId: string, payload: any): Promise<any> {
        return this.signalR.hubConnection.invoke(
            'CompleteTask',
            processId,
            payload);
    }

    private handlePublishedMessage = (topic: string, message: string, data: string, processdata: string) => {
        this.sendMessage(<BPMMessage> {
            topic: topic,
            message: message,
            data: data,
            processdata: processdata});
    }
}
