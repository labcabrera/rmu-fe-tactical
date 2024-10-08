import React from 'react';

import StyledIconButton from './StyledIconButton';

const AddButton = ({ onClick, size = 40, disabled = false }) => {

    return (
        <StyledIconButton
            disabled={disabled}
            onClick={onClick}
            style={{
                width: `${size}px`,
                height: `${size}px`,
            }}>
            <img
                src='/static/images/generic/add.png'
                alt='Add'
                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
            />
        </StyledIconButton>
    );
};

export default AddButton;