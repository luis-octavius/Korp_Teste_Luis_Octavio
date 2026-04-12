package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/luis-octavius/Korp_Teste_Luis_Octavio/services/faturamento/internal"
)

func main() {
	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer cancel()

	app, err := internal.NewApp(ctx)
	if err != nil {
		log.Fatalf("faturamento: falha ao inicializar aplicação: %v", err)
	}
	defer app.Shutdown()

	if err := app.Run(); err != nil {
		log.Fatalf("faturamento: servidor encerrado com erro: %v", err)
	}
}
