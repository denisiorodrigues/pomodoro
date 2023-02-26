import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
//Ussar esse tipo de importação quando não tem um export default
import * as zod from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const newCycleFormValidationchema = zod.object({
  task: zod.string().min(1,'Informe a tarefa'),
  minutesAmount: zod
  .number()
  .min(1, 'O ciclo precisa ser de no mínimo 5 minutos.')
  .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationchema>

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

    return (
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            id="task" 
            list="task-sugssestions"
            placeholder="Dê um nome para seu projeto"
            // disabled={!!activeCycle}
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
            // disabled={!!activeCycle}
            {...register('minutesAmount', {valueAsNumber: true})}
          />

          <span>minutos.</span>
        </FormContainer>
    )    
}