# 🐾 Projeto Pacotinho de Amor

Site oficial do **Projeto Pacotinho de Amor** — organização independente de proteção animal que
desde 2019 resgata, cuida e disponibiliza cães e gatos para adoção responsável.

---

## 🗂️ Estrutura do Projeto

```
projeto-pacotinho-de-amor/
├── frontend/          # React + Vite + Tailwind CSS
├── backend/           # Node.js + Express (API REST)
└── database/          # Schema MySQL
```

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js 18+
- MySQL 8.0+
- npm ou yarn

### 1. Banco de Dados

```bash
# Crie o banco e execute o schema
mysql -u root -p < database/schema.sql
```

### 2. Backend

```bash
cd backend
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais do MySQL

npm run dev
# Servidor rodando em http://localhost:3001
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
# Site rodando em http://localhost:5173
```

---

## 🔐 Área Administrativa

Acesse `/admin/login` com as credenciais:

- **Email:** `admin@pacotinhodeamor.com.br`
- **Senha:** `admin123` *(altere após o primeiro acesso!)*

Para gerar um novo hash de senha bcrypt:
```bash
node -e "const b=require('bcryptjs'); b.hash('suaSenha', 10).then(console.log)"
```

---

## 🌐 Deploy na Hostinger

### Backend (Node.js)
1. Configure o plano com suporte a Node.js na Hostinger
2. Faça upload dos arquivos via FTP ou Git
3. Configure as variáveis de ambiente no painel
4. Inicie com `npm start`

### Frontend (Static/React)
1. Rode `npm run build` na pasta `frontend`
2. Faça upload da pasta `dist` para o diretório público
3. Configure o servidor para redirecionar rotas para `index.html` (SPA)

### Banco de Dados MySQL
1. Crie o banco no painel da Hostinger
2. Execute o `database/schema.sql`
3. Atualize as variáveis `DB_*` no `.env` do backend

---

## 📋 Funcionalidades

### Site Público
- 🏠 **Página inicial** — hero, estatísticas, animais em destaque, próxima feirinha
- 🐾 **Adoção** — listagem com filtros (espécie, gênero, porte, status)
- 📄 **Detalhe do animal** — informações completas + link para formulário
- 🎪 **Feirinhas** — próximas e realizadas
- 💜 **Ajude** — doação via Pix, Benfeitoria e voluntariado
- 📋 **Como adotar** — passo a passo + FAQ
- 💌 **Histórias de sucesso** — depoimentos de adotantes
- 🏠 **Guia do adotante** — orientações para novos tutores
- 📬 **Contato** — links e canais de comunicação

### Área Admin
- 🔐 Login com JWT
- 📊 Dashboard com estatísticas
- 🐾 CRUD de animais (com upload de fotos)
- 🎪 CRUD de feirinhas (com upload de foto de capa)
- 💜 CRUD de histórias de sucesso

---

## 🎨 Identidade Visual

| Cor | Hex |
|-----|-----|
| Roxo principal | `#6B2D8B` |
| Roxo médio | `#B58CB4` |
| Roxo claro | `#BA90B8` |
| Roxo suave | `#EDE0ED` |
| Amarelo destaque | `#E8EC76` |

Fonte: **Nunito** (Google Fonts)

---

## 📞 Contato

- 📱 WhatsApp: (11) 99489-6555
- 📸 Instagram: [@projeto.pacotinhodeamor](https://www.instagram.com/projeto.pacotinhodeamor)
- 💜 Pix: 11994896555
