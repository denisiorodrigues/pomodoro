# pomodoro

Aplicação em react

## Bibliotcas utilizadas no projeto

* ESLint e as configurações da Rocketseat (dependência de desenvolvimento) [2 Bibliotecas]
* Utilizando o Styled-components para estilização dos componentes. [1 Biblioteca]
* Para rotas vamos utilizar o `react-douter-dom`.
* Para formulário vamos utilizar o `react-hook-form`.
* para validação vaos utilizar o `Zod`. Instalação `npm i zod`
* Utlizamos a biblioteca `@hookform/resolve` para a integração do `react-hook-form` com outras bibliotecas de validação. Instalação `npm i @hookform/resolvers`

## Rotas
Para rota funcionar, precisamos importar dentro do react-touter-dom o BrowserRouter, e envoltar toda a aplicação para a rota funcionar
Aqui utliliza os components providers

# ESLint

## Padronização do código

Comando para executar o EsLint e verificar a padronização do código

```
npx eslint src --ext .ts,.tsx
```
Corrigir todos os erros
```
npx eslint src --ext .ts,.tsx --fix
```

Configuração no VS para automatizar a padrinização do código

1. Acesse o arquivo de configurção do VS Code `ctrl + p`, digitar por `>json` para acessar o arquivo `settings.json`
2. Adicionar a aconfiguração na raiz do arquivo JSON, para quando salvar o arquivo corrigir todos os erros do ESLint  

```
    "editor.codeActionOnSave" : {
        "source.fixAll.eslint" : true,
    }
```

>### OBS
> Quando houve erro quando executar o ESLint``
>
>Usar o código abaixo para corrigir
>```
>git config core.autocrlf false
>
>git rm --cached -r .         # Don’t forget the dot at the end
>
>git reset --hard
>``` 
>
>Fontes: [Maycon Alves (Medium)](https://mayconbalves.medium.com/resolvendo-erro-delete-cr-prettier-prettier-em-projetos-react-897dac9504ea) e [haidar (stackoverflow)](https://stackoverflow.com/questions/48692741/how-can-i-make-all-line-endings-eols-in-all-files-in-visual-studio-code-unix)
