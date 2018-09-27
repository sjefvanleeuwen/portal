import { Stadspas } from './models/dto/stadspas/stadspas';
import { User } from './services/auth-service';

export const global = {
    stadspassen: new Array<Stadspas>(),
    loggedInUser: {}
};
