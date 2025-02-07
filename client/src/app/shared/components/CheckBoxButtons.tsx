import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
    items: string[]
    checked: string[]
    onChange: (items: string[]) => void;
}

export default function CheckBoxButtons({ items, checked, onChange }: Props) {
    const [checkedItems, setCheckedItems] = useState(checked);

    useEffect(() => {
        setCheckedItems(checked)
    }, [checked]);

    const handelToggle = (value: string) => {
        const updatedChecked = checkedItems?.includes(value)
            ? checkedItems.filter(item => item !== value)
            : [...checkedItems, value];
        setCheckedItems(updatedChecked);
        onChange(updatedChecked);
    }


    return (
        <FormGroup>
            {items.map(item => (
                <FormControlLabel
                    key={item}
                    control={<Checkbox
                        checked={checkedItems.includes(item)}
                        onClick={() => handelToggle(item)}
                        color='secondary' sx={{ py: 0.7, fontsize: 40 }}
                    />}
                    label={item}

                />
            ))}
        </FormGroup>
    )
}