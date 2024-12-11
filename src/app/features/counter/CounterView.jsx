import { useDispatch, useSelector } from "react-redux"
import { decrement, increaseByAmount, increment, reset } from "./counterSlice"

export const CounterView = () => {
    const count = useSelector((state) => state.counter.count)
    console.log(count)

    const dispatch = useDispatch()
    return (
        <div className="max-w-5xl mx-auto">
            <h1>count: {count}</h1>
            <button onClick={()=>{dispatch(increment())}} className="btn btn-outline">Increment</button>
            <button onClick={()=>{dispatch(decrement())}} className="btn btn-outline">Decrement</button>
            <button onClick={()=>{dispatch(reset())}} className="btn btn-outline">Reset</button>
            <button onClick={()=>{dispatch(increaseByAmount(5))}} className="btn btn-outline">increaseBy5</button>
        </div>
    )
}
