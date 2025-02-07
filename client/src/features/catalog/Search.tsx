import { debounce, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { setSearchTerm } from "./catalogSlice";
import { useEffect, useState } from "react";

export default function Search() {
    const { searchTerm } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    const [term, setTerm] = useState(searchTerm); //set a local state to allow for search to be filled before searching

    useEffect(() => {
        setTerm(searchTerm)
    }, [searchTerm]);

    const debouncedSearch = debounce(event => {
        dispatch(setSearchTerm(event.target.value))
    }, 500) // set the debounce time to 0.5 sec

    return (
        <TextField
            label='Search products'
            variant="outlined"
            fullWidth
            type="search"
            value={term}
            onChange={e => {
                setTerm(e.target.value);
                debouncedSearch(e);
            }}
        />
    )
}