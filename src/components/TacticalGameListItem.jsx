import React from "react";
import { useNavigate } from "react-router-dom";

import WorkIcon from '@mui/icons-material/Work';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import witchKing from '../assets/witch-king.jpg'

const TacticalGameListItem = ({ game }) => {
    const navigate = useNavigate();

    const handleGameClick = () => {
        navigate(`${game.id}`, { state: { game: game } });
    }

    return (
        <ListItemButton onClick={handleGameClick}>
            <ListItemAvatar>
                <Avatar src={witchKing}>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={game.name} secondary={game.username} />
        </ListItemButton>
    );
}

export default TacticalGameListItem;