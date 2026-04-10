-- name: CriarNota :one 
INSERT INTO faturamento.notas DEFAULT VALUES 
RETURNING *;

-- name: AdicionarItemNota :one 
INSERT INTO faturamento.nota_items (
    nota_id, 
    produto_id, 
    quantidade
) VALUES (
    $1, $2, $3
)
RETURNING *;

-- name: BuscarNotaPorId :one
SELECT * FROM faturamento.notas 
WHERE id = $1; 

-- name: BuscarNotaPorNumero :one 
SELECT * FROM faturamento.notas 
WHERE num_seq = $1;

-- name: ListarNotas :many
SELECT * FROM faturamento.notas
ORDER BY created_at DESC
LIMIT 100;

-- name: BuscarItemsNota :many
SELECT 
    id, 
    nota_id, 
    produto_id, 
    quantidade
FROM faturamento.nota_items
WHERE nota_id = $1
ORDER BY id;

-- name: FecharNotaAtomica :one 
UPDATE faturamento.notas
SET status = 'FECHADA',
    printed_at = NOW()
WHERE id = $1
    AND status = 'ABERTA'
RETURNING *;

-- name: VerificarStatusNota :one 
SELECT status FROM faturamento.notas 
WHERE id = $1;  