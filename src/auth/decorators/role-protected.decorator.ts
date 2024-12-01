import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../interfaces';


// Definir el nombre de la metadata para que sea unico. Debe importarse en los diferentes módulos donde se use
export const META_ROLES = 'roles';


export const RoleProtected = (...args: ValidRoles[]) => {

    return SetMetadata(META_ROLES, args);

};
