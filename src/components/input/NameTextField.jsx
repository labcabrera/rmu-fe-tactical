import React from 'react';
import { useTranslation } from 'react-i18next';

import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import { API_NPC_NAMES_URL } from '../../constants/environment';
import { VARIANT } from '../../constants/ui';

const NameTextField = ({ value, onChange, generateRandom, generateRandomRaceValue }) => {

    const { t } = useTranslation();

    const handleRandomNameClick = async (e) => {
        var race = 'generic';
        if (generateRandomRaceValue) {
            race = generateRandomRaceValue;
        }
        const response = await fetch(`${API_NPC_NAMES_URL}/random-names/${race}`);
        const responseBody = await response.text();
        console.log("readed name " + responseBody + " (" + race + ")");
        onChange({
            target: {
                name: 'name',
                value: responseBody
            }
        });
    };

    return (
        <TextField
            label={t('name')}
            variant={VARIANT}
            value={value}
            onChange={onChange}
            fullWidth
            required
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <div className='dark-avatar-container'>
                                <Avatar src='/static/images/generic/avatar.png' sx={{ width: 25, height: 25 }} />
                            </div>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="start">
                            <IconButton onClick={handleRandomNameClick}>
                                <Avatar src='/static/images/generic/refresh.png' sx={{ width: 25, height: 25 }} />
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
};

export default NameTextField;