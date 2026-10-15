import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Ticket {
  id: number;
  title: string;
  completed: boolean;
}

interface TicketState {
  data: Ticket[];
  loading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class TicketService {
  private http = inject(HttpClient);

  private state = signal<TicketState>({
    data: [],
    loading: false,
    error: null
  });

  public tickets = computed(() => this.state().data);
  public isLoading = computed(() => this.state().loading);
  public errorMessage = computed(() => this.state().error);

  public fetchTickets(): void {
    // 1. Indicamos a la UI que estamos cargando
    this.state.update(s => ({ ...s, loading: true, error: null }));

    // 2. Hacemos la llamada a la API pública de pruebas (URL completa corregida)
    this.http.get<Ticket[]>('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .subscribe({
        next: (response) => {
          // Guardamos las 10 incidencias recibidas y desactivamos la carga
          this.state.update(s => ({ ...s, data: response, loading: false }));
        },
        error: (err) => {
          console.error('Error HTTP:', err);
          this.state.update(s => ({
            ...s,
            error: 'Error de red al contactar con el servidor. Revise su conexión.',
            loading: false
          }));
        }
      });
  }
}