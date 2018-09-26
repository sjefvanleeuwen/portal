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
    
        let sp = new Stadspas();
        sp.BSN = 1419849;
        global.stadspassen.push(sp);
        sp = new Stadspas();
        sp.BSN = 2419829;
        global.stadspassen.push(sp);
        sp = new Stadspas();
        sp.BSN = 31419859;
        global.stadspassen.push(sp);

        this.model = global.stadspassen;
    }
}
