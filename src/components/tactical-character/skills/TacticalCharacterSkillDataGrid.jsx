import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes, GridToolbarContainer } from '@mui/x-data-grid';

import AddButton from '../../button/AddButton';

import { API_CORE_URL, API_TACTICAL_URL } from "../../../constants/environment";
import { DETAIL_BUTTON_SIZE } from '../../../constants/ui';

function capitalize(string) {
    if (!string) return ''; // Manejar caso vacío o null
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function EditToolbar(props) {

    const { t } = useTranslation();
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        console.log(`EditToolbar.handleClick`);
        const randId = 'pending-select-' + Math.floor(Math.random() * 100000);
        setRows((oldRows) => [
            ...oldRows,
            {
                skillId: randId,
                specialization: null,
                statistics: [],
                ranks: 0,
                statBonus: '',
                racialBonus: '',
                developmentBonus: '',
                customBonus: 0,
                totalBonus: '',
                newId: randId
            },
        ]);
        console.log(`EditToolbar.handleClick 2`);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [randId]: { mode: GridRowModes.Edit },
        }));
    };

    return (
        <GridToolbarContainer>
            <AddButton onClick={handleClick} size={DETAIL_BUTTON_SIZE} />
        </GridToolbarContainer>
    );
};

const StatisticsCell = ({ params }) => (
    <Stack direction="row" spacing={1} sx={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        {params.row.statistics.map((e, index) => (
            <Chip key={index} label={capitalize(e)} variant="outlined" />
        ))}
    </Stack>
);

const TacticalCharacterSkillDataGrid = ({ tacticalCharacter, setTacticalCharacter }) => {

    const { t, i18n } = useTranslation();

    const [rows, setRows] = useState(tacticalCharacter.skills);
    const [rowModesModel, setRowModesModel] = useState({});

    const [skillCategories, setSkillCategories] = useState([]);
    const [skills, setSkills] = useState([]);

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        console.log(`handleEditClick ${JSON.stringify(id, null, 2)}`);
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (skillId) => async () => {
        console.log(`handleSaveClick ${JSON.stringify(skillId, null, 2)}`);
        const row = rows.find(e => e.skillId === skillId);
        console.log(`row !!! ${JSON.stringify(row, null, 2)}`);
        if (row.newId) {
            console.log(`TacticalCharacterSkillDataGrid.handleSaveClick process new`);
            const request = {
                skillId: skillId,
                specialization: row.specialization,
                ranks: row.ranks,
                customBonus: row.customBonus
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request)
            };
            const response = await fetch(`${API_TACTICAL_URL}/characters/${tacticalCharacter.id}/skills`, requestOptions);
            if (response.status === 200) {
                const responseBody = await response.json();
                setTacticalCharacter(responseBody);
                setRows(responseBody.skills);
                setRowModesModel({ ...rowModesModel, [skillId]: { mode: GridRowModes.View } });
            } else {
                console.error(response.status);
            }
        } else {
            console.log(`TacticalCharacterSkillDataGrid.handleSaveClick process not new`);
            const request = {
                ranks: parseInt(row.ranks),
                customBonus: parseInt(row.customBonus)
            };
            console.log(`request !!! ${JSON.stringify(request, null, 2)}`);
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request)
            };
            const response = await fetch(`${API_TACTICAL_URL}/characters/${tacticalCharacter.id}/skills/${skillId}`, requestOptions);
            if (response.status === 200) {
                const responseBody = await response.json();
                setTacticalCharacter(responseBody);
                setRows(responseBody.skills);
                setRowModesModel({ ...rowModesModel, [skillId]: { mode: GridRowModes.View } });
            } else {
                console.error(response.status);
            }
        }
    };

    const handleRowEditCommit = (data) => {
        console.log(`handleRowEditCommit ${JSON.stringify(data, null, 2)}`);
    };

    const handleDeleteClick = (skillId) => async () => {
        console.log(`handleDeleteClick ${JSON.stringify(skillId, null, 2)}`);
        const response = await fetch(`${API_TACTICAL_URL}/characters/${tacticalCharacter.id}/skills/${skillId}`, { method: 'DELETE' });
        if (response.status === 200) {
            const responseBody = await response.json();
            setTacticalCharacter(responseBody);
            setRows(responseBody.skills);
        } else {
            console.error(response.status);
        }
    };

    const handleCancelClick = (skillId) => async () => {
        console.log('handleCancelClick ' + skillId);
        setRowModesModel({
            ...rowModesModel,
            [skillId]: { mode: GridRowModes.View, ignoreModifications: true },
        });
        const response = await fetch(`${API_TACTICAL_URL}/characters/${tacticalCharacter.id}`);
        if (response.status === 200) {
            const responseBody = await response.json();
            setTacticalCharacter(responseBody);
            setRows(responseBody.skills);
        }
    };

    const serverSideUpdate = async (updatedRow, originalRow) => {
        console.log(`TacticalCharacterSkillDataGrid.serverSideUpdate ${JSON.stringify(updatedRow, null, 2)}`);
        const row = updatedRow;
        const skillId = updatedRow.skillId;
        console.log(`row !!! ${JSON.stringify(row, null, 2)}`);
        if (row.newId) {
            console.log(`TacticalCharacterSkillDataGrid.serverSideUpdate process new`);
            const request = {
                skillId: skillId,
                specialization: row.specialization,
                ranks: row.ranks,
                customBonus: row.customBonus
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request)
            };
            const response = await fetch(`${API_TACTICAL_URL}/characters/${tacticalCharacter.id}/skills`, requestOptions);
            if (response.status === 200) {
                const responseBody = await response.json();
                setTacticalCharacter(responseBody);
                setRows(responseBody.skills);
                setRowModesModel({ ...rowModesModel, [skillId]: { mode: GridRowModes.View } });
            } else {
                console.error(response.status);
            }
        } else {
            console.log(`TacticalCharacterSkillDataGrid.serverSideUpdate process not new`);
            const request = {
                ranks: parseInt(row.ranks),
                customBonus: parseInt(row.customBonus)
            };
            console.log(`request !!! ${JSON.stringify(request, null, 2)}`);
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request)
            };
            const response = await fetch(`${API_TACTICAL_URL}/characters/${tacticalCharacter.id}/skills/${skillId}`, requestOptions);
            if (response.status === 200) {
                const responseBody = await response.json();
                setTacticalCharacter(responseBody);
                setRows(responseBody.skills);
                setRowModesModel({
                    ...rowModesModel,
                    [skillId]: { mode: GridRowModes.View, ignoreModifications: true },
                });
            } else {
                console.error(response.status);
            }
        }
    };

    const handleSelectSkillChange = (data, value) => {
        console.log(`TacticalCharacterSkillDataGrid.handleSelectSkillChange ${JSON.stringify(data, null, 2)} > ${value}`);
        const newId = data.newId;
        console.log(`TacticalCharacterSkillDataGrid.handleSelectSkillChange ${newId} > ${value}`);
        const updatedRows = rows.map((row) =>
            row.newId === newId ? { ...row, skillId: value } : row
        );
        setRows(updatedRows);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [value]: { mode: GridRowModes.Edit },
        }));
    };

    const handleProcessRowUpdateError = (error) => {
        console.error(`handleProcessRowUpdateError ${error}`);
    };

    useEffect(() => {
        console.log(`TacticalCharacterSkillDataGrid.useEffect triggered`);
        const fetchSkillCategories = async () => {
            const response = await fetch(`${API_CORE_URL}/skill-categories?size=500`);
            const data = await response.json();
            setSkillCategories(data.content);
        };
        const fetchSkills = async () => {
            const response = await fetch(`${API_CORE_URL}/skills?size=500`);
            const responseBody = await response.json();
            const translated = responseBody.content.map(e => {
                return {
                    ...e,
                    name: t(e.id)
                }
            });
            const sorted = translated.sort((a, b) => a.id.localeCompare(b.id));
            setSkills(sorted);
        };
        fetchSkillCategories();
        fetchSkills();
    }, []);

    const columns = [
        {
            field: 'skillId', headerName: 'Skill', width: 300, renderCell: (params) => (
                <>
                    {!params.row.skillId.startsWith('pending-select-' || !skills) ? (
                        <div>{t(params.row.skillId)}</div>
                    ) : (
                        <Select
                            value={(params.value === undefined || params.value === null) ? '' : params.value}
                            fullWidth
                            variant='outlined'
                            size='small'
                            onChange={(event) => handleSelectSkillChange(params.row, event.target.value)}>
                            {skills.map((option) => (
                                <MenuItem key={option.id} value={option.id}>{t(option.id)}</MenuItem>
                            ))}
                        </Select>

                    )}
                </>
            ),
        },
        { field: 'specialization', headerName: 'Specialization', type: 'text', align: 'right', width: 250, editable: true },
        {
            field: 'statistics', headerName: 'Statistics', width: 180,
            renderCell: (params) => (<StatisticsCell params={params} />)
        },
        { field: 'ranks', headerName: 'Ranks', type: 'text', align: 'right', width: 120, editable: true },
        { field: 'developmentBonus', headerName: '+Dev', type: 'text', align: 'right', width: 120, editable: false },
        { field: 'statBonus', headerName: '+Stats', type: 'text', align: 'right', width: 120, editable: false },
        { field: 'racialBonus', headerName: '+Racial', type: 'text', align: 'right', width: 120, editable: false },
        { field: 'customBonus', headerName: '+Custom', type: 'text', align: 'right', width: 120, editable: true },
        { field: 'totalBonus', headerName: 'Total', type: 'text', align: 'right', width: 120, editable: false },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 160,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <div>
            <Box
                sx={{
                    // height: 500,
                    height: '100%',
                    width: '100%',
                    '& .actions': {
                        color: 'text.secondary',
                    },
                    '& .textPrimary': {
                        color: 'text.primary',
                    }
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowHeight={80}
                    getRowId={row => row.skillId}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={(updatedRow, originalRow) => serverSideUpdate(updatedRow, originalRow)}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                    onRowEditCommit={handleRowEditCommit}
                    disableRowSelectionOnClick
                    slots={{
                        toolbar: EditToolbar,
                    }}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                />
            </Box>
        </div>
    );
}

export default TacticalCharacterSkillDataGrid;