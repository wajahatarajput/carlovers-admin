// src/lib/ability.ts
import { Ability, AbilityBuilder } from '@casl/ability';

export interface User {
    role?: string;
}

export const defineAbilityFor = (user: User) => {
    const { can, cannot, build } = new AbilityBuilder(Ability);

    console.log(user?.role)
    if (user?.role === 'admin') {
        can('manage', 'all');
    } else if (user?.role === 'owner') {
        can('read', 'all');
        can('read', 'dashboard');
        cannot('manage', 'admin');
    } else if (user?.role === 'workshop') {
        can('manage', 'workshop-dashboard');
    }
    else {
        can('read', 'public');
    }

    return build();
};
