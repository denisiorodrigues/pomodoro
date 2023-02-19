import { Play } from "phosphor-react";
import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";
//Ussar esse tipo de importação quando não tem um export default
import * as zod from 'zod';

import { 
  CountdownContainer, 
  FormContainer, 
  HomeContainer, 
  TaskInput, 
  MinutesAmountInput,
  StratCountdownButton, 
  Separator} from "./styles";

const newCycleFormValidationchema = zod.object({
  task: zod.string().min(1,'Informe a tarefa'),
  minutesAmount: zod
  .number()
  .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
  .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationchema>

export function Home() {

  const { register, handleSubmit, watch } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  function handleCreateNewCycle(data: any) {
    console.log(data);
  }

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            id="task" 
            list="task-sugssestions"
            placeholder="Dê um nome para seu projeto"
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
            min={5}
            max={60}
            {...register('minutesAmount', {valueAsNumber: true})}
          />

          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StratCountdownButton  disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StratCountdownButton>
      </form>
    </HomeContainer>
  )
}
