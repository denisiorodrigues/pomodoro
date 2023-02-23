import { HandPalm, Play } from "phosphor-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
//Ussar esse tipo de importação quando não tem um export default
import * as zod from 'zod';
import { useEffect, useState } from "react";
import { differenceInSeconds, setQuarter } from 'date-fns';

import { 
  CountdownContainer, 
  FormContainer, 
  HomeContainer, 
  TaskInput, 
  MinutesAmountInput,
  Separator,
  StopCountdownButton,
  StartCountdownButton} from "./styles";

const newCycleFormValidationchema = zod.object({
  task: zod.string().min(1,'Informe a tarefa'),
  minutesAmount: zod
  .number()
  .min(1, 'O ciclo precisa ser de no mínimo 5 minutos.')
  .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number,
  startDate: Date,
  interruptedDate?: Date,
  finishedDate?: Date
}

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondPassed, setAmountSecondPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if(activeCycle){
      interval = setInterval(() => {
        const scondsDifference = differenceInSeconds(new Date (), activeCycle.startDate);

        if(scondsDifference >= totalSeconds){
          setCycles((state) => 
            state.map((cycle) => {
              if(cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return cycle;
              }
            }),
          );

          setAmountSecondPassed(totalSeconds);

          clearInterval(interval);

        } else {
          setAmountSecondPassed(scondsDifference);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      }
    } 
  }, [activeCycle, totalSeconds, activeCycleId]);

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles((state) =>  [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondPassed(0);

    reset();
  }

  function handleInterruptCycle() {
    setCycles((state) => 
      state.map((cycle) => {
        if(cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      }),
    );

    setActiveCycleId(null);
  }

  const currentSeconds = activeCycle ? totalSeconds - amountSecondPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2,'0');
  const seconds = String(secondsAmount).padStart(2,'0');

  useEffect(() => {
    if(activeCycle){
      document.title = `${minutes}:${seconds} `
    }
  }, [minutes, seconds, activeCycle]);

  const task = watch('task');
  const isSubmitDisabled = !task;

  console.log(cycles);

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            id="task" 
            list="task-sugssestions"
            placeholder="Dê um nome para seu projeto"
            disabled={!!activeCycle}
            {...register('task')}
          />

          <datalist id="task-sugssestions">
            <option value="Acordar cedo" />
            <option value="Fazer o pull da aplucação" />
            <option value="Resolver conflitos" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput 
            type="number" 
            id="minutesAmount" 
            placeholder="00"
            step={5}
            min={1}
            max={60}
            disabled={!!activeCycle}
            {...register('minutesAmount', {valueAsNumber: true})}
          />

          <span>minutos.</span>
        </FormContainer>
        
        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>
        
        { activeCycle ? (
            <StopCountdownButton onClick={handleInterruptCycle} type="button">
              <HandPalm size={24} />
              Interromper
            </StopCountdownButton>
          ) : (
            <StartCountdownButton  disabled={isSubmitDisabled} type="submit">
              <Play size={24} />
              Começar
            </StartCountdownButton>
          )
        }
        
      </form>
    </HomeContainer>
  )
}