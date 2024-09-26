import React from 'react';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import HealthBar from './HealthBar';

const CombatCharacterRoundInfo = ({ characterRound, character }) => {

    if (!characterRound || !character) {
        return <p>Loading...</p>
    }

    const getAvatarImage = () => {
        return `/static/images/races/${character.info.race}.jpg`;
    };

    return (
        <Card>
            <CardContent>
                <Avatar alt={character.name} src={getAvatarImage()} />
                <Typography variant="h6" component="div">
                    {character.name}
                </Typography>
                <Typography variant="h7" component="div">
                    {character.info.race} {character.info.level}
                </Typography>
                <p></p>
                <p>{character.hp.current}/{character.hp.max} HP</p>
                <HealthBar currentHP={character.hp.current} maxHP={character.hp.max} />
            </CardContent>
        </Card>
    );
}

export default CombatCharacterRoundInfo;
