import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Avatar from "@mui/material/Avatar";

import { VARIANT } from "../../constants/ui";

import MenuItem from '@mui/material/MenuItem';

const SelectAttackPosition = ({ value, onChange }) => {

    const { t } = useTranslation();
    const options = [
        "normal",
        "flank",
        "rear",
        "toFlank",
        "toRear"
    ];

    const handleChange = (event) => {
        onChange(event.target.value);
    }

    return (
        <TextField
            select
            label={t('positional-attack')}
            value={(value === undefined || value === null || options.length === 0) ? '' : value}
            variant={VARIANT}
            fullWidth
            onChange={handleChange}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <Avatar src='/static/images/generic/select-weapon.png' sx={{ width: 25, height: 25 }} />
                        </InputAdornment>
                    ),
                },
            }}>
            {options.map((option, index) => (<MenuItem key={index} value={option}>{t(`position-${option}`)}</MenuItem>))}
        </TextField>
    );
}

export default SelectAttackPosition;