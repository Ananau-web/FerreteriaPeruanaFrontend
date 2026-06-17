import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedorService } from '../../services/proveedor';
import { Proveedor } from '../../model/proveedor';

@Component({
  selector: 'app-registrar-proveedor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Importante para usar formularios
  templateUrl: './registrar-proveedor.html'
})
export class RegistrarProveedorComponent {
  proveedorForm: FormGroup;

  private fb = inject(FormBuilder);
  private proveedorService = inject(ProveedorService);

  constructor() {
    // Definimos las validaciones del formulario
    this.proveedorForm = this.fb.group({
      nombre: ['', Validators.required],
      ruc: ['', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern('^[0-9]*$') // Solo números permitidos
      ]]
    });
  }

  onSubmit(): void {
    if (this.proveedorForm.valid) {
      const nuevoProveedor: Proveedor = this.proveedorForm.value;

      this.proveedorService.registrarProveedor(nuevoProveedor).subscribe({
        next: (respuesta) => {
          alert(`¡Éxito! Proveedor ${respuesta.nombre} registrado correctamente.`);
          this.proveedorForm.reset(); // Limpiamos las cajas de texto
        },
        error: (err) => {
          console.error(err);
          alert('Error al registrar: ' + (err.error || 'Verifica la conexión al backend'));
        }
      });
    } else {
      alert('Por favor, revisa que el RUC tenga exactamente 11 números.');
    }
  }
}