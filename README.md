<h1 align="center">Ulysses xPact</h1><br>

<p align="center">
  <a href="https://github.com/6laercio/ulysses-xpact/">
    <img src="https://raw.githubusercontent.com/6laercio/ulysses-xpact/refs/heads/main/public/icons/icon128.png" alt="Ulysses xPact logo" height="128">
  </a>
</p>

<p align="center">
  Extensão para Chrome que bloqueia sites distrativos temporariamente para manter seu foco, baseada no <a href="https://en.wikipedia.org/wiki/Ulysses_pact" target="_blank">"Pacto de Ulisses"</a>: criar restrições quando a força de vontade não for suficiente para resistir às distrações.
</p>

## 🚀 Principais Funcionalidades

- Bloqueie sites tentadores com apenas um clique
- Bloqueios temporários (1 hora) para ajudar a manter o foco
- Página de bloqueio com contador regressivo
- Interface simples e intuitiva

## 🔧 Instruções de Uso

### Configuração do Ambiente

1. Clone o repositório e navegue até o diretório do projeto

   ```bash
   git clone https://github.com/6laercio/ulysses-xpact.git
   cd ulysses-xpact
   ```

2. Instale as dependências:

   ```bash
   pnpm install
   ```

3. Compile o projeto:

   ```bash
   pnpm run build
   ```

4. Para desenvolvimento com recompilação automática:
   ```bash
   pnpm run dev
   ```

### Instalação no Chrome

5. Carregar a extensão no Chrome:
   - Navegue para `chrome://extensions/`
   - Ative o "Modo do desenvolvedor" (botão no canto superior direito)
   - Clique em "Carregar sem compactação"
   - Selecione a pasta `dist` do projeto

### Testando a Extensão

6. **Testando o popup:**

   - Clique no ícone da extensão na barra de ferramentas do Chrome
   - O popup aparecerá mostrando o domínio atual
   - Para ver os logs do console ao clicar no botão de bloqueio:
     - Clique com o botão direito no popup e selecione "Inspecionar"
     - Vá para a aba "Console" nas ferramentas de desenvolvedor

7. **Testando a página de bloqueio:**

   - Após carregar a extensão, copie o ID da extensão da página `chrome://extensions/`
   - Acesse diretamente no navegador:
     ```
     chrome-extension://SEU_ID_DA_EXTENSAO/block/block.html?site=exemplo.com
     ```
   - Você pode substituir "exemplo.com" por qualquer domínio para testar

8. **Visualizando logs do background script:**
   - Na página `chrome://extensions/`
   - Localize sua extensão e certifique-se que "Modo do desenvolvedor" está ativado
   - Procure por um link chamado "service worker" (ou "service worker inativo")
   - Clique nesse link para abrir as ferramentas de desenvolvedor do service worker
   - Na aba "Console" você verá todos os logs do background script

## 📋 Roadmap de Desenvolvimento

### 1. Configuração Básica

- [x] Criar diretório do projeto
- [x] Configurar manifest.json (v3)
- [x] Definir permissões (storage, tabs, webRequest)
- [x] Criar ícone da extensão

### 2. Sistema de Armazenamento

- [ ] Implementar estrutura de dados para sites bloqueados
- [ ] Configurar Chrome Storage API
- [ ] Criar funções para adicionar/remover bloqueios

### 3. Mecanismo de Bloqueio

- [ ] Detectar navegação para sites bloqueados
- [ ] Implementar sistema de tempo (início/término)
- [ ] Criar redirecionamento para página de bloqueio

### 4. Página de Bloqueio

- [ ] Criar HTML/CSS para página de bloqueio
- [ ] Implementar contador regressivo
- [ ] Adicionar mensagem motivacional

### 5. Interface do Popup

- [ ] Desenvolver UI do popup
- [ ] Mostrar lista de sites bloqueados
- [ ] Exibir contadores para cada bloqueio
- [ ] Adicionar botão para bloquear site atual

### 6. Refinamento

- [ ] Melhorar design visual
- [ ] Adicionar notificações
- [ ] Implementar opções de personalização
- [ ] Otimizar performance

### 7. Testes e Publicação

- [ ] Testar em diversos sites
- [ ] Corrigir bugs
- [ ] Preparar para Chrome Web Store

## 🔧 Em Desenvolvimento

Esta extensão está em desenvolvimento ativo. Contribuições são bem-vindas!

## 📜 Licença

MIT License
