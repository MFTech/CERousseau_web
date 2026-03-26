# Site do Centro de Estudos Rousseau do Brasil

Site institucional estático do CER, construído com [Astro](https://astro.build/) e [Decap CMS](https://decapcms.org/), hospedado no GitHub Pages.

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- Conta no GitHub
- Conta no [Formspree](https://formspree.io) (para o formulário de contato)
- Google Calendar público (para a agenda)

---

## 1. Configuração inicial antes do primeiro deploy

### 1.1 Clonar e instalar

```bash
git clone https://github.com/ORG/REPO_NAME.git
cd REPO_NAME
npm install
```

### 1.2 Ajustar o base path (OBRIGATÓRIO)

Abra [astro.config.mjs](astro.config.mjs) e substitua os placeholders:

```js
export default defineConfig({
  site: 'https://SEU_ORG.github.io',   // ex: https://cerousseaubrasil.github.io
  base: '/SEU_REPO',                   // ex: /CERousseau_web
  output: 'static',
});
```

> Se o repositório for uma **user/org page** (nome do repo = `SEU_ORG.github.io`), use `base: '/'` ou remova a linha `base`.

### 1.3 Ajustar o Decap CMS

Abra [public/admin/config.yml](public/admin/config.yml) e substitua:

```yaml
backend:
  repo: SEU_ORG/SEU_REPO            # ex: CERousseauBrasil/CERousseau_web
  app_id: SEU_CLIENT_ID             # veja seção 1.4 abaixo

site_url: https://SEU_ORG.github.io/SEU_REPO
display_url: https://SEU_ORG.github.io/SEU_REPO

public_folder: "/SEU_REPO/uploads"  # mesmo valor que base em astro.config.mjs
```

### 1.4 Criar o GitHub OAuth App

1. Acesse [github.com/settings/developers](https://github.com/settings/developers) (ou nas configurações da organização)
2. Clique em **"New OAuth App"**
3. Preencha:
   - **Application name:** CER CMS
   - **Homepage URL:** `https://SEU_ORG.github.io/SEU_REPO`
   - **Authorization callback URL:** `https://api.decapch.app/callback`
4. Clique em **"Register application"**
5. Copie o **Client ID** e cole em `public/admin/config.yml` no campo `app_id`
6. **Não é necessário** criar um Client Secret (o fluxo PKCE não usa segredos)

### 1.5 Configurar variáveis de ambiente (Formspree + Google Calendar)

Os IDs sensíveis **não ficam no código-fonte** — são lidos de variáveis de ambiente.

**Localmente:**
```bash
cp .env.example .env
# Edite .env e preencha os valores (o arquivo .env não é commitado)
```

**No GitHub (para o deploy automático):**
1. No repositório, vá em **Settings → Secrets and variables → Actions**
2. Clique em **"New repository secret"** e crie dois secrets:

| Nome | Valor |
|------|-------|
| `PUBLIC_CALENDAR_ID` | ID do Google Calendar (veja abaixo como obter) |
| `PUBLIC_FORMSPREE_ID` | ID do formulário Formspree (veja abaixo como obter) |

**Como obter o ID do Google Calendar:**
1. Abra as **Configurações** do calendário desejado
2. Em **"Integrar calendário"**, copie o **ID do calendário**
3. O calendário deve estar definido como **público**

**Como obter o ID do Formspree:**
1. Crie uma conta gratuita em [formspree.io](https://formspree.io)
2. Crie um novo formulário e defina o e-mail de destino
3. Copie o ID (parte final do endpoint, ex: em `https://formspree.io/f/xpzgkwqv` → use `xpzgkwqv`)

---

## 2. Deploy no GitHub Pages

### 2.1 Configurar o GitHub Pages

1. Crie o repositório no GitHub (se ainda não existir) e faça o push
2. No repositório, vá em **Settings → Pages**
3. Em **Source**, selecione **"GitHub Actions"**
4. Pronto — a cada push para a branch `main`, o site será publicado automaticamente

### 2.2 Workflow automático

O arquivo [.github/workflows/deploy.yml](.github/workflows/deploy.yml) já está configurado. Ele:
- Instala as dependências com `npm ci`
- Executa o build com `npm run build`
- Publica o conteúdo da pasta `dist/` no GitHub Pages

---

## 3. Desenvolvimento local

```bash
npm run dev        # inicia o servidor de desenvolvimento em http://localhost:4321
npm run build      # gera o build estático em dist/
npm run preview    # pré-visualiza o build localmente
```

---

## 4. Editar conteúdo via CMS

Após o deploy, acesse o painel de administração em:

```
https://SEU_ORG.github.io/SEU_REPO/admin/
```

1. Clique em **"Login with GitHub"**
2. Autorize o acesso (na primeira vez)
3. Edite o conteúdo desejado e clique em **"Publish"**
4. O GitHub Actions iniciará automaticamente um novo deploy com as alterações

### Adicionar novos editores

Para que outra pessoa possa editar o conteúdo via CMS, ela precisa ter **acesso de escrita (write)** ao repositório no GitHub:

1. Vá em **Settings → Collaborators → Add people**
2. Digite o nome de usuário do GitHub do editor
3. Selecione a função **"Write"**
4. O editor receberá um convite por e-mail

---

## 5. Estrutura do projeto

```
├── .github/workflows/deploy.yml   Workflow de deploy automático
├── public/
│   ├── Logo.png                   Logo do CER
│   ├── uploads/                   Mídias enviadas via CMS
│   └── admin/
│       ├── index.html             Painel Decap CMS
│       └── config.yml             Configuração do CMS
├── src/
│   ├── content/
│   │   ├── config.ts              Schema das coleções de conteúdo
│   │   ├── pages/                 Páginas editáveis via CMS
│   │   └── atelie/                Edições do Ateliê de Pesquisa
│   ├── components/                Header, Nav, Footer
│   ├── layouts/Layout.astro       Layout HTML compartilhado
│   ├── styles/global.css          Estilos globais
│   └── pages/                     Rotas do site
├── astro.config.mjs               Configuração do Astro
└── package.json
```

---

## 6. Placeholders que precisam ser preenchidos

| Arquivo | Placeholder | O que colocar |
|---------|-------------|---------------|
| `astro.config.mjs` | `ORG` / `REPO_NAME` | Organização e nome do repo no GitHub |
| `public/admin/config.yml` | `ORG/REPO_NAME` | Mesmo acima |
| `public/admin/config.yml` | `SUBSTITUA_PELO_CLIENT_ID_DO_OAUTH_APP` | Client ID do GitHub OAuth App |
| GitHub Secrets | `PUBLIC_CALENDAR_ID` | ID do Google Calendar público |
| GitHub Secrets | `PUBLIC_FORMSPREE_ID` | ID do formulário Formspree |
| `src/content/atelie/2o_atelie_de_pesquisa.md` | `youtube_url: ""` | URL do vídeo no YouTube |
