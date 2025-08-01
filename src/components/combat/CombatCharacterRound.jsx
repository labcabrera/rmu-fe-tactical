import React, { useContext, useEffect, useState } from "react";

import { Box } from "@mui/material";
import Grid from '@mui/material/Grid';

import CombatCharacterPhaseOptions from './CombatCharacterPhaseOptions';
import CombatCharacterRoundInfo from "./CombatCharacterRoundInfo";
import CombatCharacterRoundInitiative from "./CombatCharacterRoundInitiative";
import CombatFreeActionButtons from "./CombatFreeActionButtons";
import { CombatContext } from './CombatProvider';

const CombatCharacterRound = ({ characterRound }) => {
    const [character, setCharacter] = useState();
    const { game } = useContext(CombatContext);
    const { characters } = useContext(CombatContext);
    const { roundActions } = useContext(CombatContext);

    const loadCharacter = () => {
        setCharacter(characters.find(item => item.id === characterRound.characterId));
    };

    useEffect(() => {
        loadCharacter();
    }, []);

    if (!characterRound || !characters || !character || !roundActions) {
        return <p>Loading character round...</p>
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0} columns={24} alignItems="center" >
                <Grid item size={5}>
                    <CombatCharacterRoundInfo character={character} characterRound={characterRound} />
                </Grid>
                <Grid item size={19}>
                    <Grid container item alignItems="center">
                        <Grid item size={2} display='flex' justifyContent="center">
                            <CombatCharacterRoundInitiative />
                        </Grid>
                        <Grid item size={2} display='flex' justifyContent="center" >
                            <CombatFreeActionButtons tacticalGame={game} character={character} />
                        </Grid>
                        <Grid item size={2} display='flex' justifyContent="center">
                            <CombatCharacterPhaseOptions character={character} phase={1} />
                        </Grid>
                        <Grid item size={2} display='flex' justifyContent="center">
                            <CombatCharacterPhaseOptions character={character} phase={2} />
                        </Grid>
                        <Grid item size={2} display='flex' justifyContent="center">
                            <CombatCharacterPhaseOptions character={character} phase={3} />
                        </Grid>
                        <Grid item size={2} display='flex' justifyContent="center">
                            <CombatCharacterPhaseOptions character={character} phase={4} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CombatCharacterRound;
