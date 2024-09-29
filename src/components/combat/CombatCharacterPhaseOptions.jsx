import React, { useContext, useEffect, useState } from "react";

import CombatPhaseActionButtons from "./ComabatPhaseActionButtons";
import { CombatContext } from './CombatProvider';
import ResolveActionCard from './ResolveActionCard';

const CombatCharacterPhaseOptions = ({ character, phase }) => {

    const [activeAction, setActiveAction] = useState(null);

    const { characters, setCharacters } = useContext(CombatContext);
    const { tacticalGame, setTacticalGame } = useContext(CombatContext);
    const { roundActions, setRoundActions } = useContext(CombatContext);

    const loadActiveAction = () => {
        const characterActions = roundActions.filter(e => e.tacticalCharacterId == character.id);
        for (let action of characterActions) {
            const actionStart = action.phaseStart;
            const actionEnd = action.phaseStart + action.actionPoints - 1;
            if (phase >= actionStart && phase <= actionEnd) {
                setActiveAction(action);
                return;
            }
        };
        setActiveAction(null);
    };

    useEffect(() => {
        console.log(`CombatCharacterPhaseOptions.useEffect triggered`);
        loadActiveAction();
    }, []);

    useEffect(() => {
        console.log(`CombatCharacterPhaseOptions.useEffect[roundActions] triggered roundActions.length: ` + roundActions.length);
        loadActiveAction();
    }, [roundActions]);

    if (!character || !phase) {
        return <p>Loading...</p>
    }

    if (activeAction == null) {
        return <CombatPhaseActionButtons character={character} tacticalGame={tacticalGame} characters={characters} phaseNumber={phase} />
    }

    if ((activeAction.phaseStart + activeAction.actionPoints - 1) == phase) {
        return <ResolveActionCard action={activeAction} />
    }

    return (
        <div>
            <p>Declared {activeAction.type}</p>
        </div >
    );
}

export default CombatCharacterPhaseOptions;