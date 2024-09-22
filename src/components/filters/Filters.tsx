import React, { useCallback, useRef, useState } from 'react';
import { Box, Button, MenuItem, Select, TextField } from '@mui/material';
import debounce from "lodash.debounce";
import { useSelector } from 'react-redux';
import { RootStateType } from 'src/store';
import { HandleChaneParamType, QueryParams } from '../GamesWrapper';
import DropdownSelector from './DropdownSelector';

interface FilterProps {
    queryParams?: QueryParams;
    handleChangeParam: HandleChaneParamType;
    resetParams: () => void;
}

const Filters: React.FC<FilterProps> = ({ queryParams, handleChangeParam, resetParams }) => {
    const categoriesInitial = useSelector((state: RootStateType) => state.games.categoriesInitial);
    const providersInitial = useSelector((state: RootStateType) => state.games.providersInitial);
    const featuresInitial = useSelector((state: RootStateType) => state.games.featuresInitial);
    const themesInitial = useSelector((state: RootStateType) => state.games.themesInitial);
    const [temporarySearch, setTemporarySearch] = useState<string>(queryParams?.search || '');

    const debouncedSearch = useRef(
        debounce((value: string) => {
            handleChangeParam("search", value);
        }, 1000)
    ).current;

    const handleSearchChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setTemporarySearch(value);
            debouncedSearch(value);
        },
        [debouncedSearch]
    );

    const handleReset = useCallback(() => {
        resetParams();
        setTemporarySearch('');
    }, [resetParams]);

    return (
        <Box
            display="flex"
            flexDirection='column'
            justifyContent="space-between"
            marginBottom={2}
            gap={2}
        >
            <Box display="flex"
                gap={2}
                justifyContent="space-between">
                <TextField
                    label="Search for a game"
                    variant="outlined"
                    value={temporarySearch}
                    onChange={handleSearchChange}
                    fullWidth
                />

                <Select
                    value={queryParams?.category || ''}
                    onChange={(e) => handleChangeParam("category", e.target.value)}
                    displayEmpty
                    variant="outlined"
                >
                    <MenuItem value="">All Categories</MenuItem>
                    {categoriesInitial.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'stretch', sm: 'center' }}
                gap={2}
                justifyContent="space-between"
            >
                <Button onClick={handleReset}>Reset filters</Button>
                <Box>
                    <DropdownSelector initialData={providersInitial} handleChangeParam={handleChangeParam} fieldName="providers" title="Providers" selectedValues={queryParams?.providers} />
                    <DropdownSelector initialData={featuresInitial} handleChangeParam={handleChangeParam} fieldName="features" title="Features" selectedValues={queryParams?.features} />
                    <DropdownSelector initialData={themesInitial} handleChangeParam={handleChangeParam} fieldName="themes" title="Themes" selectedValues={queryParams?.themes} />
                </Box>
            </Box>
        </Box>
    )
}

export default Filters