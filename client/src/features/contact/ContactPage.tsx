import { decrement, increment } from "./counterReducer"
import { Button, ButtonGroup, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/store/store";

export default function ContactPage() {
  const {data} = useAppSelector(state => state.counter)
  const dispatch = useAppDispatch();


  return (
    <div>
        <h1>Contact Page page</h1>
        <Typography variant="body1">
          The data is: {data}
        </Typography>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe hic error tenetur maiores vitae, accusantium maxime, pariatur assumenda illum iusto voluptatum non officiis? Maiores fuga consequuntur impedit, odio mollitia maxime.</p>
        <ButtonGroup>
          <Button onClick={() =>dispatch(decrement(1))} color="error">Decrement</Button>
          <Button onClick={() =>dispatch(increment(1))} color="success">Increment</Button>
          <Button onClick={() =>dispatch(increment(5))} color="primary">Increment by 5</Button>
          <Button onClick={() =>dispatch(decrement(5))} color="warning">decrement by 5</Button>
        </ButtonGroup>
    </div>
  )
}