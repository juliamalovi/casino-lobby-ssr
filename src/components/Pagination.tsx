import { Box, Pagination as MuiPagination } from '@mui/material'

interface PaginationProps {
    totalPages: number;
    page: number;
    handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, page, handlePageChange }) => {
    return (
        <Box display="flex" justifyContent="center" marginTop={4}>
            <MuiPagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
            />
        </Box>
    )
}

export default Pagination