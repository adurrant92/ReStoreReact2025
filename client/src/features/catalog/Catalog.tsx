import { Grid2, Typography } from "@mui/material";
import ProductList from "./ProductList";
import { useFetchFiltersQuery, useFetchProductsQuery } from "./catalogApi";
import Filters from "./filters";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import AppPagination from "../../app/shared/components/AppPagination";
import { setPageNumber } from "./catalogSlice";




export default function Catalog() {
  const productParams = useAppSelector(state => state.catalog);

  const { data, isLoading } = useFetchProductsQuery(productParams);
  const { data: filtersData, isLoading: filtersLoading } = useFetchFiltersQuery();

  const dispatch = useAppDispatch()

  if (isLoading || !data || filtersLoading || !filtersData) return <div>...loading</div>

  return (
    <Grid2 container spacing={4}>
      <Grid2>
        <Filters filtersData={filtersData} />
      </Grid2>
      <Grid2 size={9}>
        {data.items && data.items.length > 0 ? (
          <>
            <ProductList products={data.items} />
            <AppPagination
              metadata={data.pagination}
              onPageChage={(page: number) => {
                dispatch(setPageNumber(page))
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            />
          </>
        ) : (
          <Typography variant="h5">
            There are no Items to display for this filter
          </Typography>

        )}


      </Grid2>

    </Grid2>

  )
}//