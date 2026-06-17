import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig) // Inicia la aplicación Angular utilizando el componente raíz 'App' y la configuración proporcionada en 'appConfig'
  .catch((err) => console.error(err));
