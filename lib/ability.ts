// src/lib/ability.ts
import { Ability, AbilityBuilder } from '@casl/ability';

export interface User {
    role?: string;
}

export const defineAbilityFor = (user: User) => {
    const { can, cannot, build } = new AbilityBuilder(Ability);

    if (user?.role === 'admin') {
        can('manage', 'all');
    } else if (user?.role === 'owner') {
        can('manage', 'owner-dashboard');
    } else if (user?.role === 'workshop') {
        can('manage', 'workshop-dashboard');
        can('manage', 'verification');
    } else if (user?.role === 'driver') {
        can('manage', 'driver-dashboard');
    }
    else {
        can('read', 'public');
    }

    return build();
};
