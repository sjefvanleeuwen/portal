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
        this.signalR.hubConnection.on('connected', () => {
            this.signalR.hubConnection.on('publishmessage', this.handlePublishedMessage);
            // subscribe to events, so the user interface can update.
            this.signalR.hubConnection.invoke('Subscribe', Topics[0]);
            this.signalR.hubConnection.invoke('Subscribe', Topics[1]);
            this.signalR.hubConnection.invoke('Subscribe', Topics[2]);
          });
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

    public subscribeForCityPass(bsn: number) {
        this.signalR.hubConnection.invoke('Subscribe', `city-pass-${bsn}`);
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
