import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { ErrorProvider } from './ErrorContext';
import './i18n';
import './index.css';
import MovementResolution from './modules/action-resolution/movement/MovementResolution';
import AttackResolution from './modules/combat-actions/attack/AttackResolution';
import CombatDashboard from './modules/combat-dashboard/CombatDashboard';
import { CombatProvider } from './modules/combat-dashboard/CombatProvider';
import TacticalGameCreation from './modules/tactical-games/create/TacticalGameCreation';
import TacticalGameEdit from './modules/tactical-games/edit/TacticalGameEdit';
import TacticalGameList from './modules/tactical-games/list/TacticalGameList';
import TacticalGameView from './modules/tactical-games/view/TacticalGameView';

const App = () => {
  return (
    <ErrorProvider>
      <CombatProvider>
        <Box sx={{ p: 5 }}>
          <Routes>
            <Route path="/" element={<TacticalGameList />} />
            <Route path="/games" element={<TacticalGameList />} />
            <Route path="/games/create" element={<TacticalGameCreation />} />
            <Route path="/games/view/:gameId" element={<TacticalGameView />} />
            <Route path="/games/edit/:gameId" element={<TacticalGameEdit />} />
            <Route path="/combat/:gameId" element={<CombatDashboard />} />
            <Route path="/combat/:gameId/resolve-attack/:actionId" element={<AttackResolution />} />
            <Route path="/combat/:gameId/resolve/movement/:actionId" element={<MovementResolution />} />
          </Routes>
        </Box>
      </CombatProvider>
    </ErrorProvider>
  );
};

export default App;
