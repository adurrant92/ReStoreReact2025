import { Box, Pagination, Typography } from "@mui/material";
import { Pagination as PaginationType } from "../../models/pagination";

type Props = {
    metadata: PaginationType
    onPageChage: (page: number) => void
}

export default function AppPagination({ metadata, onPageChage }: Props) {
    const { currentPage, totalPages, pageSize, totalCount } = metadata

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalCount)

    return (
        <Box display='flex' justifyContent='space-between' alignItems='center' marginTop={3}>
            <Typography>
                Displaying items {startItem} - {endItem} of {totalCount}
            </Typography>
            <Pagination
                color="secondary"
                size='large'
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => onPageChage(page)}
            />
        </Box>
    )
}