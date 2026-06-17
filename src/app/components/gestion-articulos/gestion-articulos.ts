import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticuloService } from '../../services/articulo';
import { Articulo } from '../../model/articulo';
import { LineaProducto } from '../../model/linea-producto';

@Component({
  selector: 'app-gestion-articulos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gestion-articulos.html'
})
export class GestionArticulosComponent implements OnInit {

  articulos: Articulo[]       = [];
  lineas: LineaProducto[]     = [];
  articulosFiltrados: Articulo[] = [];

  cargando         = false;
  errorMsg         = '';
  exitoMsg         = '';
  mostrarModal     = false;
  busqueda         = '';

  articuloForm!: FormGroup;

  private fb             = inject(FormBuilder);
  private articuloService = inject(ArticuloService);

  readonly unidades = ['UND', 'KG', 'MT', 'LT', 'CJA', 'PAQ', 'DOC', 'M2', 'M3'];
  readonly rotaciones = [
    { valor: 1, etiqueta: '🔴 Baja'  },
    { valor: 2, etiqueta: '🟡 Media' },
    { valor: 3, etiqueta: '🟢 Alta'  },
  ];

  ngOnInit(): void {
    this.construirFormulario();
    this.cargarDatos();
  }

  construirFormulario(): void {
    this.articuloForm = this.fb.group({
      codigo:         ['', [Validators.required, Validators.maxLength(20)]],
      codigoBarras:   ['', Validators.maxLength(30)],
      nombre:         ['', [Validators.required, Validators.maxLength(150)]],
      idLineaProducto:['', Validators.required],
      unidadMedida:   ['', Validators.required],
      precioUnitario: ['', [Validators.required, Validators.min(0.01)]],
      nivelRotacion:  ['', Validators.required],
    });
  }

  cargarDatos(): void {
    this.cargando = true;
    this.errorMsg = '';

    // Carga artículos
    this.articuloService.getArticulos().subscribe({
      next: (data) => {
        this.articulos         = data;
        this.articulosFiltrados = data;
        this.cargando          = false;
      },
      error: () => {
        this.errorMsg = 'No se pudo conectar al servidor. Verifica que el backend esté activo.';
        this.cargando = false;
      }
    });

    // Carga líneas de producto para el select
    this.articuloService.getLineasProducto().subscribe({
      next: (data) => this.lineas = data
    });
  }

  filtrar(termino: string): void {
    this.busqueda = termino;
    const t = termino.toLowerCase();
    this.articulosFiltrados = this.articulos.filter(a =>
      a.nombre.toLowerCase().includes(t) ||
      a.codigo.toLowerCase().includes(t)   ||
      (a.codigoBarras ?? '').toLowerCase().includes(t)
    );
  }

  abrirModal(): void {
    this.articuloForm.reset();
    this.exitoMsg   = '';
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  onSubmit(): void {
    if (this.articuloForm.invalid) return;

    const form = this.articuloForm.value;
    const lineaSeleccionada = this.lineas.find(l => l.idLineaProducto === +form.idLineaProducto)!;

    const nuevo: Articulo = {
      codigo:          form.codigo,
      codigoBarras:    form.codigoBarras || undefined,
      nombre:          form.nombre,
      unidadMedida:    form.unidadMedida,
      precioUnitario:  +form.precioUnitario,
      nivelRotacion:   +form.nivelRotacion,
      lineaProducto:   lineaSeleccionada,
    };

    this.articuloService.registrarArticulo(nuevo).subscribe({
      next: (guardado) => {
        this.articulos.unshift(guardado);
        this.filtrar(this.busqueda);
        this.exitoMsg    = `✅ Artículo "${guardado.nombre}" registrado correctamente.`;
        this.articuloForm.reset();
        setTimeout(() => this.cerrarModal(), 1500);
      },
      error: (err) => {
        this.errorMsg = 'Error al guardar: ' + (err.error?.message || 'Verifica el backend.');
      }
    });
  }

  eliminar(articulo: Articulo): void {
    if (!confirm(`¿Eliminar "${articulo.nombre}"?`)) return;
    this.articuloService.eliminarArticulo(articulo.idArticulo!).subscribe({
      next: () => {
        this.articulos         = this.articulos.filter(a => a.idArticulo !== articulo.idArticulo);
        this.articulosFiltrados = this.articulosFiltrados.filter(a => a.idArticulo !== articulo.idArticulo);
      },
      error: () => alert('No se pudo eliminar el artículo.')
    });
  }

  nivelEtiqueta(n: number): string {
    return this.rotaciones.find(r => r.valor === n)?.etiqueta ?? String(n);
  }

  trackById(_: number, a: Articulo) { return a.idArticulo; }
}
