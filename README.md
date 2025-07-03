# PadFlow - Controlador de Áudio Web em Tempo Real

Um controlador de áudio versátil, baseado na web, desenhado para músicos, artistas de palco e equipas de louvor. O PadFlow oferece pads de ambiente contínuos em qualquer tom musical e uma mesa de som de efeitos totalmente personalizável, tudo controlável em tempo real a partir de um dispositivo secundário, como um smartphone.

---

## ✨ Funcionalidades Principais

- **Pads de Ambiente Contínuos:** Toque instantaneamente pads de fundo de alta qualidade e sem interrupções, apenas selecionando um tom musical. Perfeito para criar atmosfera durante músicas ou transições.

- **Mesa de Efeitos Personalizável:** Construa a sua própria mesa de som dinamicamente. Adicione novos pads, carregue os seus próprios ficheiros de áudio (`.mp3`, `.wav`, etc.) e apague-os conforme a sua necessidade.

- **Controlo Remoto em Tempo Real:** Ative o "Modo Host" para gerar um QR code único. Leia-o com qualquer dispositivo móvel para obter uma interface de controlo remoto que comanda a aplicação principal, enquanto o áudio continua a ser reproduzido pelo sistema de som do computador anfitrião.

- **Estado Persistente:** A sua configuração de efeitos é guardada automaticamente no IndexedDB do seu navegador, garantindo que a sua configuração seja preservada entre sessões. Não é preciso carregar os seus ficheiros novamente a cada utilização.

- **Comunicação em Tempo Real Serverless:** Usa o **Supabase Realtime** para criar uma conexão fiável e de baixa latência entre os dispositivos, sem a necessidade de um servidor dedicado.

- **Motor de Áudio de Alta Qualidade:** Potenciado pelo **Tone.js**, um poderoso framework para criar música interativa no navegador, garantindo agendamento e reprodução de áudio com precisão.

## 🚀 Como Funciona

O PadFlow opera em dois modos:

1.  **Modo Host (Computador Principal):** Esta é a instância principal da aplicação, conectada a um sistema de som. Ela gere o motor de áudio e cria um ID de sessão único, exibido como um QR code. Fica a "ouvir" os comandos dos controladores conectados.

2.  **Modo Controlador (Dispositivo Móvel):** Após ler o QR code, o dispositivo móvel abre uma interface de controlo leve. Tocar num pad no controlador envia um comando através do Supabase para o Host, que então toca o áudio correspondente instantaneamente.

Esta arquitetura permite que um músico (ex: um baterista ou vocalista) controle os pads de áudio da sua posição no palco, enquanto o computador principal trata do processamento de áudio.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** [React](https://react.dev/) com [Vite](https://vitejs.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Motor de Áudio:** [Tone.js](https://tonejs.github.io/)
- **Comunicação Real-time & Persistência:** [Supabase](https://supabase.com/)
- **Gestão de Estado:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/)

## ⚙️ Como Executar o Projeto

Para executar o PadFlow na sua máquina local, siga estes passos:

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/seu-usuario/padflow.git](https://github.com/seu-usuario/padflow.git)
    cd padflow
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    pnpm install
    # ou
    yarn install
    ```

3.  **Configure o Supabase:**

    - Crie um projeto no [Supabase](https://supabase.com).
    - Na raiz do projeto, crie um ficheiro `.env.local`.
    - Adicione as suas credenciais do Supabase a este ficheiro:
      ```
      VITE_SUPABASE_URL=URL_DO_SEU_PROJETO_SUPABASE
      VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLIC_AQUI
      ```
    - **Importante:** Certifique-se de que o seu código que inicializa o cliente Supabase lê estas variáveis de ambiente (ex: `import.meta.env.VITE_SUPABASE_URL`).

4.  **Execute o servidor de desenvolvimento:**

    ```bash
    npm run dev
    # ou
    pnpm dev
    ```

5.  Abra [http://localhost:5173](http://localhost:5173) no seu navegador para ver a aplicação.
