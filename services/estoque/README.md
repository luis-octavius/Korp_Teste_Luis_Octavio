# Serviço de Estoque

Microsserviço responsável pelo controle de produtos e saldos em estoque.

## Tecnologias

- **Go 1.24+**
- **Chi** — roteamento HTTP
- **pgx/v5** — driver PostgreSQL
- **sqlc** — geração de queries type-safe

## Responsabilidades

- Cadastro e consulta de produtos
- Débito atômico de estoque
- Reversão de débito (estorno)
- Registro de movimentações

## Configuração

### Variáveis de ambiente

| Variável | Descrição | Exemplo |
|---|---|---|
| `DATABASE_URL` | String de conexão com o PostgreSQL | `postgres://user:pass@localhost:5432/korp?search_path=estoque` |
| `PORT` | Porta do servidor HTTP | `8080` |

### Banco de dados

O serviço utiliza o schema `estoque` dentro de um PostgreSQL compartilhado.

Para rodar as migrations manualmente:

```bash
psql $DATABASE_URL -f db/migrations/001_init_schema.sql
psql $DATABASE_URL -f db/migrations/002_create_produtos.sql
psql $DATABASE_URL -f db/migrations/003_create_movimentacoes.sql
```

## Rodando localmente

```bash
# Instalar dependências
go mod download

# Rodar o serviço
DATABASE_URL="postgres://user:pass@localhost:5432/korp" PORT=8080 go run cmd/main.go
```

## Rodando com Docker

```bash
docker build -t korp-estoque .
docker run -p 8080:8080 \
  -e DATABASE_URL="postgres://user:pass@localhost:5432/korp" \
  korp-estoque
```

## Endpoints

### Produtos

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/produtos` | Cadastrar produto |
| `GET` | `/produtos` | Listar produtos |
| `GET` | `/produtos/{id}` | Buscar produto por ID |

### Estoque (uso interno)

> Estes endpoints são consumidos pelo serviço de Faturamento e não devem ser expostos publicamente.

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/estoque/debitar` | Debitar quantidade do estoque |
| `POST` | `/estoque/reverter` | Reverter débito (estorno) |

## Exemplos de requisição

### Cadastrar produto

```bash
curl -X POST http://localhost:8080/produtos \
  -H "Content-Type: application/json" \
  -d '{"nome": "Notebook Dell", "saldo": 10}'
```

**Resposta:**
```json
{
  "id": "e2a1b3c4-...",
  "nome": "Notebook Dell",
  "saldo": 10
}
```

### Listar produtos

```bash
curl http://localhost:8080/produtos
```

### Debitar estoque

```bash
curl -X POST http://localhost:8080/estoque/debitar \
  -H "Content-Type: application/json" \
  -d '{
    "produto_id": "e2a1b3c4-...",
    "quantidade": 2,
    "nota_id": "f3b2c4d5-...",
    "nota_num": 1
  }'
```

**Resposta:**
```json
{
  "produto_id": "e2a1b3c4-...",
  "novo_saldo": 8
}
```

## Geração de código (sqlc)

Caso altere as queries em `db/queries/estoque.sql`, regenere o código com:

```bash
make sqlc
# ou diretamente:
sqlc generate -f db/sqlc.yaml
```
