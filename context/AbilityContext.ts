import { createContext } from 'react';
import { Ability } from '@casl/ability';

export const AbilityContext = createContext(new Ability());
