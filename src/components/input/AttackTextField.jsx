import React from 'react';
import { useTranslation } from 'react-i18next';

import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import { VARIANT } from '../../constants/ui';

const AttackTextField = ({ i18LabelKey = 'attack', value, onChange, disabled = false, required = false }) => {

    const { t } = useTranslation();

    return (
        <TextField
            label={t(i18LabelKey)}
            disabled={disabled}
            variant={VARIANT}
            fullWidth
            value={value}
            onChange={onChange}
            required={required}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <Avatar src='/static/images/generic/sword.png' sx={{ width: 25, height: 25 }} />
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
};

export default AttackTextField;