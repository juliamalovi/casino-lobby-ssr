import React, { useCallback, useEffect, useState } from 'react'
import { Button, Popover, FormGroup, FormControlLabel, Checkbox, Box, Badge } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune';
import { HandleChaneParamType, QueryParams } from '../GamesWrapper';

interface DropdownSelectorProps {
    initialData: { id: string; name: string }[];
    handleChangeParam: HandleChaneParamType;
    fieldName: keyof QueryParams;
    title: string;
    selectedValues?: string[];
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({ initialData, handleChangeParam, fieldName, title, selectedValues: selectedValuesFromQuery }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [selectedValues, setSelectedValues] = useState<string[]>(selectedValuesFromQuery || []);

    useEffect(() => {
        setSelectedValues(selectedValuesFromQuery || []);
    }, [selectedValuesFromQuery]);
    
    const handleProviderChange = useCallback((providerId: string) => {
        setSelectedValues((prev) => {
            if (prev.includes(providerId)) {
                return prev.filter((id) => id !== providerId);
            } else {
                return [...prev, providerId];
            }
        });
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleApplyValues = useCallback(() => {
        handleChangeParam(fieldName, selectedValues);
        handleClose();
    }, [fieldName, handleChangeParam, handleClose, selectedValues]);

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const open = Boolean(anchorEl);
    const id = open ? `${fieldName}-popover` : undefined;

    return (<>
        <Button variant='contained' onClick={handleClick} sx={{ ml: '1rem', px: '2rem' }}>
            <TuneIcon sx={{ mr: 1 }} /> {title}
            {selectedValues.length > 0 && (
                <Badge badgeContent={selectedValues.length} color="secondary" sx={{ ml: 2 }} />
            )}
        </Button>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <Box sx={{ maxHeight: 300, overflow: 'auto', position: 'relative' }}>
                <FormGroup sx={{ padding: '1rem', paddingBottom: '4rem' }}>
                    {initialData.map((item) => (
                        <FormControlLabel
                            key={item.id}
                            control={
                                <Checkbox
                                    checked={selectedValues.includes(item.id)}
                                    onChange={() => handleProviderChange(item.id)}
                                />
                            }
                            label={item.name}
                        />
                    ))}
                </FormGroup>
                <Box sx={{
                    position: 'sticky',
                    bottom: 0,
                    backgroundColor: 'background.paper',
                    padding: '1rem',
                    borderTop: '1px solid',
                    borderColor: 'divider'
                }}>
                    <Button onClick={handleApplyValues} fullWidth variant="contained">Apply</Button>
                </Box>
            </Box>
        </Popover>
    </>);
};
export default DropdownSelector;