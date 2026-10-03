import type { ComponentType } from 'react';
import type { CardId } from '../../types/course';

import { Card01MasterMap } from '../../cards/Card01MasterMap';
import { Card02SentenceStructure } from '../../cards/Card02SentenceStructure';
import { Card03QuestionsNegatives } from '../../cards/Card03QuestionsNegatives';
import { Card04TimeLogic } from '../../cards/Card04TimeLogic';
import { Card05ResultDuration } from '../../cards/Card05ResultDuration';
import { Card06AbilityWantNeedAdvice } from '../../cards/Card06AbilityWantNeedAdvice';
import { Card07ConnectingIdeas } from '../../cards/Card07ConnectingIdeas';
import { Card08PrepositionsChunks } from '../../cards/Card08PrepositionsChunks';
import { Card09Articles } from '../../cards/Card09Articles';
import { Card10Quantity } from '../../cards/Card10Quantity';
import { Card11RealityConditionals } from '../../cards/Card11RealityConditionals';
import { Card12ComplexMeaning } from '../../cards/Card12ComplexMeaning';
import { Card13RealSpokenEnglish } from '../../cards/Card13RealSpokenEnglish';
import { Card14PracticeSystem } from '../../cards/Card14PracticeSystem';

export const cardComponents: Record<CardId, ComponentType> = {
  1: Card01MasterMap, 2: Card02SentenceStructure, 3: Card03QuestionsNegatives,
  4: Card04TimeLogic, 5: Card05ResultDuration, 6: Card06AbilityWantNeedAdvice,
  7: Card07ConnectingIdeas, 8: Card08PrepositionsChunks, 9: Card09Articles,
  10: Card10Quantity, 11: Card11RealityConditionals, 12: Card12ComplexMeaning,
  13: Card13RealSpokenEnglish, 14: Card14PracticeSystem,
};


