import { Component } from '@angular/core';
import { global } from './../../globals';
import { Stadspas } from './../../models/dto/stadspas/stadspas';

@Component({
    selector: 'app-stadspas-list',
    templateUrl: 'stadspas-list.component.html'
})
export class StadspasListComponent {
    public model: Array<Stadspas>;

    constructor() {
        this.model = global.stadspassen;
    }
}
