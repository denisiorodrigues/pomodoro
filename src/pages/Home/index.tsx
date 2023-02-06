import { Play } from "phosphor-react";
import { 
  CountdownContainer, 
  FormContainer, 
  HomeContainer, 
  TaskInput, 
  MinutesAmountInput,
  StratCountdownButton, 
  Separator} from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            id="task" 
            placeholder="Dê um nome para seu projeto"
            list="task-sugssestions"
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

        <StratCountdownButton type="submit" disabled>
          <Play size={24} />
          Começar
        </StratCountdownButton>
      </form>
    </HomeContainer>
  )
}
