import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import List from '@mui/material/List';
import Stack from '@mui/material/Stack';

import AddButton from "../../button/AddButton";
import TacticalGameViewCharactersListItem from "./TacticalGameViewCharactersListItem";

import { API_TACTICAL_URL } from "../../../constants/environment";
import { DETAIL_BUTTON_SIZE } from "../../../constants/ui";

const TacticalGameViewCharacters = ({ tacticalGame }) => {

    const debugMode = false;

    const navigate = useNavigate();
    const [tacticalCharacters, setTacticalCharacters] = useState([]);

    const removeCharacter = (id) => {
        setTacticalCharacters(tacticalCharacters.filter(item => item.id !== id));
    };

    useEffect(() => {
        const fetchTacticalCharacters = async () => {
            const url = `${API_TACTICAL_URL}/characters?gameId=${tacticalGame.id}&page=0&size=100`;
            try {
                const response = await fetch(url, { method: "GET", });
                const data = await response.json();
                setTacticalCharacters(data.content);
            } catch (error) {
                console.error("error loading characters :" + error);
            }
        };
        fetchTacticalCharacters();
    }, []);

    const handleAddNewCharacter = () => {
        navigate("/tactical/characters/creation", { state: { tacticalGame: tacticalGame } });
    };

    return (
        <>
            <List sx={{ width: '100%' }}>
                {tacticalCharacters.map((item, index) => (
                    <TacticalGameViewCharactersListItem
                        key={index}
                        character={item}
                        tacticalGame={tacticalGame}
                        onRemoveCharacter={removeCharacter} />
                ))}
            </List>
            <Stack spacing={0} direction="row" sx={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                marginLeft: "8px"
            }}>
                <AddButton onClick={handleAddNewCharacter} size={DETAIL_BUTTON_SIZE} />
            </Stack>
            {debugMode ? (
                <div>
                    <pre>
                        {JSON.stringify(tacticalCharacters, null, 2)}
                    </pre>
                </div>
            ) : null}
        </>
    );
};

export default TacticalGameViewCharacters;