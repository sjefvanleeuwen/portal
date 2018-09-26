import { BPMProcess, BPMProcessData } from '../bpm/bpm-process';

export class Stadspas {
    constructor() {
        this.process = new BPMProcess();
    }

    // request
    public BSN: number;
    public cardType: string;

    // log
    public requestedAt: Date;
    public userChoiceAt: Date;

    // data
    public notificationDataBRP: any;
    public notificationDataPass: any;

    // process
    public process: BPMProcess;
    public processData: BPMProcessData;
    public askForInput: boolean;
    public activatedAt: Date;

    // status
    public get status(): string {
        if (this.activatedAt) {
            return 'Geactiveerd';
        } else if (this.userChoiceAt) {
            return 'Wachten op bevestiging';
        } else if (this.askForInput) {
            return 'Wachten op gebruiker';
        } else if (this.requestedAt) {
            return 'Aangevraagd';
        } else {
            return '';
        }
    }

    public get statusClass(): string {
        if (this.activatedAt) {
            return 'bg-success';
        } else if (this.userChoiceAt) {
            return 'bg-secondary';
        } else if (this.askForInput) {
            return 'bg-primary';
        } else if (this.requestedAt) {
            return 'bg-warning';
        } else {
            return '';
        }
    }

}
