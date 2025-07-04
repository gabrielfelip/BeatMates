# 🎸 BeatMates: Sua Companhia para Shows e Festivais 🤘

![BeatMates Logo Placeholder](https://via.placeholder.com/400x150/6a5acd/FFFFFF?text=BeatMates+Logo)

## 🌟 Visão Geral do Projeto

O **BeatMates** é um aplicativo móvel inovador, inspirado no formato de "match" do Tinder, mas com um foco exclusivo: conectar pessoas através de seus interesses musicais em comum, shows, festivais e artistas favoritos. A ideia principal é ajudar amantes da música que vão a eventos sozinhos a encontrarem companhia, ou para aqueles que deixam de ir por falta de alguém para acompanhá-los.

Já tive a experiência de ir a muitos shows sozinho e conhecer pessoas incríveis na mesma situação. Também vi muitos amigos que deixaram de ir a eventos por não ter companhia. O BeatMates surge para resolver essa dor, proporcionando um ambiente seguro e divertido para encontrar "parceiros de show" e criar novas amizades baseadas em paixões musicais compartilhadas.

## ✨ Funcionalidades Principais (Até o Momento)

Estamos construindo o aplicativo passo a passo, e aqui estão as funcionalidades já implementadas ou em desenvolvimento:

### ✅ Fluxo de Criação de Perfil (Completo!)

O usuário passa por um processo guiado para construir seu perfil musical:

* **Informações Básicas:** Coleta de nome, idade, gênero e localização.
* **Estilos Musicais Preferidos:** Seleção interativa de gêneros musicais favoritos.
* **Artistas Favoritos:** Busca e seleção de 5 ou mais artistas que o usuário mais gosta.
* **Artistas que Sonha em Ver ao Vivo:** Busca e seleção de artistas que o usuário adoraria ver em shows.
* **Festivais Preferidos:** Busca e seleção de festivais que o usuário gosta ou deseja ir.
* **Sua "Vibe" em Shows/Eventos:** Seleção de como o usuário gosta de aproveitar eventos musicais (ex: "ir pra galera", "curtir mais de boa", "descobrir bandas novas").

### 🎶 Feed de Eventos (Mockado)

* Tela inicial do aplicativo exibindo um feed de eventos (shows, festivais) com dados de exemplo.
* Layout de cards para cada evento, mostrando nome, artista, data, local e gênero.
* **(Próximos Passos):** Personalização do feed com base nos interesses do usuário e integração com dados reais.

## 🚀 Próximos Passos (Roadmap)

Nosso foco agora é levar o BeatMates para o próximo nível, implementando:

1.  **Integração com Firebase:**
    * Configuração do projeto Firebase.
    * **Autenticação de Usuários:** Implementar login e cadastro reais (e-mail/senha, Google).
    * **Armazenamento de Dados (Firestore):** Salvar os perfis musicais dos usuários no banco de dados.
2.  **Lógica de Match:**
    * Desenvolvimento do algoritmo para sugerir matches com base nos interesses musicais e eventos em comum.
    * Implementação da interface de "swipe" (curtir/passar).
3.  **Chat:**
    * Funcionalidade de chat entre usuários que deram "match".
    * Recursos de segurança (aceitação de chat, bloqueio).
4.  **Recursos de Segurança e Denúncias:**
    * Funcionalidades de denúncia e bloqueio de usuários.
    * Diretrizes de segurança visíveis no app.

## 🛠️ Tecnologias Utilizadas

* **Frontend Mobile:** [React Native](https://reactnative.dev/) (com [Expo](https://expo.dev/))
* **Backend & Banco de Dados:** [Firebase](https://firebase.google.com/) (Firestore, Authentication, Cloud Functions)
* **Navegação:** [Expo Router](https://expo.github.io/router/)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (para um código mais robusto e tipado)
* **Gerenciamento de Pacotes:** `npm` ou `Yarn`

## 💻 Como Rodar o Projeto (Ambiente de Desenvolvimento)

Para configurar e rodar o projeto em sua máquina:

1.  **Pré-requisitos:**
    * Node.js (versão LTS recomendada)
    * npm (já vem com Node.js) ou Yarn
    * Expo CLI (`npm install -g expo-cli`)
    * Aplicativo Expo Go no seu celular (Android/iOS) ou um emulador
    * Visual Studio Code (ou seu editor de código preferido)

2.  **Clonar o Repositório:**
    ```bash
    git clone [https://github.com/gabrielfelip/BeatMates.git](https://github.com/gabrielfelip/BeatMates.git) 
    cd BeatMates
    ```

3.  **Instalar Dependências:**
    ```bash
    npm install # ou yarn install
    ```

4.  **Iniciar o Servidor de Desenvolvimento:**
    ```bash
    npx expo start
    ```
    Isso abrirá uma aba no seu navegador com um QR Code. Escaneie-o com o app Expo Go no seu celular para ver o aplicativo em tempo real.

5.  **Limpar Cache (em caso de problemas):**
    ```bash
    npm cache clean --force
    # No Windows: rmdir /s /q node_modules & rmdir /s /q .expo
    # No Linux/macOS: rm -rf node_modules .expo
    npm install
    npx expo start --clear
    ```

---

**Status do Projeto: 🚧 Em Construção - Não Finalizado 🚧**

---

## 📄 Licença

[MIT License](LICENSE) (Ou a licença que você preferir)

---