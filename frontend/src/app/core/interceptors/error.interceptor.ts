import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let mensagem = 'Ocorreu um erro inesperado';

      switch (error.status) {
        case 0:
          mensagem = 'Serviço indisponível. Verifique sua conexão.';
          break;
        case 400:
          mensagem = error.error?.erro ?? 'Requisição inválida';
          break;
        case 404:
          mensagem = error.error?.erro ?? 'Recurso não encontrado';
          break;
        case 422:
          // Erros de negócio — saldo insuficiente, nota já fechada, etc.
          mensagem = error.error?.erro ?? 'Operação não permitida';
          break;
        case 500:
          mensagem = 'Erro interno no servidor';
          break;
      }

      snackBar.open(mensagem, 'Fechar', {
        duration: 5000,
        panelClass: ['snackbar-erro'],
      });

      return throwError(() => error);
    }),
  );
};
