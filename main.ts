import './polyfills.ts';
import './index.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { TestLibModule } from './test';

import { enableProdMode} from '@angular/core';
import { environment } from './src/environments/environment';
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(TestLibModule);
