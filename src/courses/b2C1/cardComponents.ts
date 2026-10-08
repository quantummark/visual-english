import type { ComponentType } from 'react';
import type { CardId } from '../../types/course';
import { Card01 } from './components/Card01';
import { Card02 } from './components/Card02';
import { Card03 } from './components/Card03';
import { Card04 } from './components/Card04';
import { Card05 } from './components/Card05';
import { Card06 } from './components/Card06';
import { Card07 } from './components/Card07';
import { Card08 } from './components/Card08';
import { Card09 } from './components/Card09';
import { Card10 } from './components/Card10';
import { Card11 } from './components/Card11';
import { Card12 } from './components/Card12';
import { Card13 } from './components/Card13';
import { Card14 } from './components/Card14';

export const b2C1CardComponents: Record<CardId, ComponentType> = {
  1: Card01,
  2: Card02,
  3: Card03,
  4: Card04,
  5: Card05,
  6: Card06,
  7: Card07,
  8: Card08,
  9: Card09,
  10: Card10,
  11: Card11,
  12: Card12,
  13: Card13,
  14: Card14,
};
