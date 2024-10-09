import React from 'react';
import { Route, Routes } from 'react-router-dom';

import TacticalAttackCreation from './components/combat-actions/TacticalAttackCreation';
import TacticalMovementCreation from './components/combat-actions/TacticalMovementCreation';
import CombatDashboardParent from './components/combat/CombatDashboardParent';
import ForgeItem from './components/items/ForgeItem';
import TacticalCharacterCreation from './components/tactical-character/TacticalCharacterCreation';
import TacticalCharacterModification from './components/tactical-character/TacticalCharacterModification';
import TacticalGameCreation from './components/tactical-game/create/TacticalGameCreation';
import TacticalGameList from './components/tactical-game/list/TacticalGameList';
import TacticalGameView from './components/tactical-game/view/TacticalGameView';

import './i18n';
import './index.css';

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<TacticalGameList />} />
      <Route path='/view/:gameId' element={<TacticalGameView />} />
      <Route path='/combat/:gameId' element={<CombatDashboardParent />} />
      <Route path='/combat/:gameId/declare-attack' element={<TacticalAttackCreation />} />
      <Route path='/combat/:gameId/declare-movement' element={<TacticalMovementCreation />} />
      <Route path='/creation' element={<TacticalGameCreation />} />
      <Route path='/characters/creation' element={<TacticalCharacterCreation />} />
      <Route path='/characters/edit/:characterId' element={<TacticalCharacterModification />} />
      <Route path='/forge/:gameId' element={<ForgeItem />} />
    </Routes>
  );
};

export default App;
