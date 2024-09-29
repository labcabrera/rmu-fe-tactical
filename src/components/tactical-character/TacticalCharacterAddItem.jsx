import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';

import { API_TACTICAL_URL, API_ITEMS_URL } from '../../constants/environment';

const TacticalCharacterAddItem = ({ tacticalCharacter }) => {

    const variant = "standard";

    const location = useLocation();

    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch(`${API_ITEMS_URL}/items?size=1000`);
            const data = await response.json();
            setItems(data.content);
        };
        fetchItems();
    }, []);

    const handleSelectedChange = (e) => {
        setSelectedItem(e.target.value);
    };

    const addItem = async () => {
        try {
            const item = items.find(e => e.id == selectedItem);
            const request = {
                itemTypeId: item.id,
                category: item.category,
                weaponRange: item.weaponRange,
                attackTable: item.attackTable,
                skillId: item.skillId
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request)
            };
            const response = await fetch(`${API_TACTICAL_URL}/characters/${tacticalCharacter.id}/items`, requestOptions);
            const responseBody = response.json();
            //TODO set useState
        } catch (error) {
            console.error(`TacticalCharacterAddItem.addItem %{error}`);
        }

    };

    if (!tacticalCharacter || !items) {
        return <p>Loading...</p>
    }

    return (
        <div className="tactical-character-add-item">
            Selected: {JSON.stringify(selectedItem, null, 2)}
            <Grid container spacing={2}>
                <Grid size={8}>
                    <FormControl fullWidth>
                        <InputLabel id="select-label-item-to-add">Item to add</InputLabel>
                        <Select
                            id="select-item-to-add"
                            labelId="select-label-item-to-add"
                            label="Item to add"
                            value={selectedItem}
                            required
                            variant={variant}
                            onChange={handleSelectedChange}>
                            {items.map((item, index) => (<MenuItem key={index} value={item.id}>{item.id}</MenuItem>))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={4}>
                    <IconButton variant={variant} onClick={addItem}>
                        <AddIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    );
}

export default TacticalCharacterAddItem;