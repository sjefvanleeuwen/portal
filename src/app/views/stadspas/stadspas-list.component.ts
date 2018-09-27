import { Component } from '@angular/core';
import { global } from '../../app.globals';
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

    formattedName(stadspas: Stadspas): string {
        if (!stadspas || !stadspas.notificationDataBRP) {
            return '';
        }

        // tslint:disable-next-line:max-line-length
        const result = `${stadspas.notificationDataBRP.voorletterAanschrijving} ${stadspas.notificationDataBRP.voorvoegselGeslachtnaam} ${stadspas.notificationDataBRP.geslachtsnaam}`;
        return result.replace('  ', ' ');
    }
}
