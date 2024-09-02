import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { MocoService } from './moco-time-watcher/services/moco.service';
import { environment } from '../environments/environment';
import { MocoServiceMock } from './moco-time-watcher/services/moco.service.mock';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    { provide: MocoService, useClass: environment.mock ? MocoServiceMock : MocoService },
  ],
};
