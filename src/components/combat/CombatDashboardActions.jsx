import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import { CombatContext } from './CombatProvider';

import { API_TACTICAL_URL } from "../../constants/environment";

const CombatDashboardActions = () => {

    const navigate = useNavigate();

    const { displayRound, setDisplayRound } = useContext(CombatContext);
    const { tacticalGame, setTacticalGame } = useContext(CombatContext);

    const handleDisplayPreviousRoundClick = () => {
        setDisplayRound(displayRound > 1 ? displayRound - 1 : 1);
    };

    const handleDisplayNextRoundClick = () => {
        setDisplayRound(displayRound + 1);
    };

    const handleNextRoundClick = async () => {
        try {
            const response = await fetch(`${API_TACTICAL_URL}/tactical-games/${tacticalGame.id}/rounds/start`, { method: 'POST' });
            const data = await response.json();
            setTacticalGame(data);
            setDisplayRound(data.round);
        } catch (error) {
            console.error("CombatDashboardActions.fecthCharacterRounds error: " + error);
        }
    };

    const handleCloseDashboardClick = () => {
        navigate(`/tactical/view/${tacticalGame.id}`, { state: { tacticalGame: tacticalGame } });
    };

    if (!displayRound || !tacticalGame) {
        return <p>Loading...</p>
    }

    return (
        <div className="combat-dashboard-actions">
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: '100%', height: 100 }}
            >

                <div>Round {displayRound}/{tacticalGame.round}</div>

                <div style={{ flexGrow: 1 }} />

                <Button variant="outlined">Action phase</Button>
                <Button variant="outlined">End turn</Button>

                <Tooltip title="Previous round">
                    <span>
                        <IconButton variant="outlined" onClick={handleDisplayPreviousRoundClick} disabled={displayRound < 2}>
                            <NavigateBeforeOutlinedIcon />
                        </IconButton>
                    </span>
                </Tooltip>

                <Tooltip title="Next round">
                    <span>
                        <IconButton variant="outlined" onClick={handleDisplayNextRoundClick} disabled={displayRound >= tacticalGame.round}>
                            <NavigateNextOutlinedIcon />
                        </IconButton>
                    </span>
                </Tooltip>

                <Tooltip title="New round">
                    <IconButton variant="outlined" onClick={handleNextRoundClick}>
                        <PlayCircleIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Exit">
                    <IconButton variant="outlined" onClick={handleCloseDashboardClick}>
                        <CloseOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
        </div>
    );
}

export default CombatDashboardActions;
