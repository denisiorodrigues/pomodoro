import { createContext, ReactNode, useReducer, useState } from "react";
import { ActionTypes, addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleasFinishedAction } from "../reducers/cycles/action";
import { cyclesReducer } from "../reducers/cycles/reducer";

interface CreateCycleData {
  task: string
  minutesAmount: number
}

export interface Cycle {
  id: string
  task: string
  minutesAmount: number,
  startDate: Date,
  interruptedDate?: Date,
  finishedDate?: Date
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void,
  amountSecondPassed: number,
  setSecondsPassed: (seconds: number) => void,
  createNewCycle: (data: CreateCycleData) => void,
  interruptCurrentCycle: () => void
}
  
export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({ children } : CyclesContextProviderProps) {
  // const [cycles, setCycles] = useState<Cycle[]>([]);
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles : [],
    activeCycleId: null
  });

  const { cycles, activeCycleId  } = cyclesState;

  const [amountSecondPassed, setAmountSecondPassed] = useState(0);
  
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setSecondsPassed(seconds: number){
    setAmountSecondPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleasFinishedAction());
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    dispatch(addNewCycleAction(newCycle));
    setAmountSecondPassed(0);
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction());
  }

  return (
    <CyclesContext.Provider value={{
      cycles,
      activeCycle,
      activeCycleId,
      markCurrentCycleAsFinished,
      amountSecondPassed,
      setSecondsPassed,
      createNewCycle,
      interruptCurrentCycle
    }}>
      { children }
    </CyclesContext.Provider>
  )
}