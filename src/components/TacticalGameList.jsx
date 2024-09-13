import React, { useEffect, useState } from "react";

import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import TacticalGameListItem from "./TacticalGameListItem";

const TacticalGameList = () => {
    const [games, setGames] = useState([]);

    const getGames = async () => {
        const response = await fetch("http://localhost:3001/v1/tactical-games", {
            method: "GET",
        });
        const data = await response.json();
        setGames(data);
    };

    useEffect(() => {
        getGames();
    }, []);


    return (
        <div>
            <div class="tactical-game-list-actions">
                <Stack spacing={2} direction="row" sx={{
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                }}>
                    <Button variant="contained">New</Button>
                </Stack>
            </div>
            <div class="tactical-game-list">
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {games.map((item) => (
                        <TacticalGameListItem key={item.id} game={item} />
                    ))}
                </List>
            </div>
        </div>
    );
}

export default TacticalGameList;