import { Stadspas } from './models/dto/stadspas/stadspas';
import { User } from './models/dto/user';

export const global = {
    stadspassen: new Array<Stadspas>(),
    loggedInUser: new User()
};
