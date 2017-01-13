<p align="center">
  <img src="/angular.png" alt="Angular2 Common Components Library" width="100" height="100"/>
</p>

# Angular2 Common Components Library

> An Angular2 Common Components Library using [Angular 2](https://angular.io/), [RxJS](https://github.com/Reactive-Extensions/RxJS), [TypeScript](http://www.typescriptlang.org/), Services, Injectables, [Karma](http://karma-runner.github.io/), Forms and [tslint](http://palantir.github.io/tslint/) by [Fabrizio Torelli](https://github.com/hellgate75)

This repo shows an example application using RxJS and Angular 2. The goal is to show how to use the Observables data architecture pattern and Router subroute combinations within Angular 2. It also features:

* Symple tsconfig with TypeScript, Karma tslint
* Writing async components that work with RxJS
* Writing Security Guards allowing or blocking access
* How to write injectable services in Angular 2
* How to write components data and events exchange with RxJS in Angular 2
* How to simply integrate jquery, jquery-ui and semantic-ui in Angular2
* The library provides many components and a global module
* Use neasted typings in a simple tsc project
* And much more

## Quick start

```bash
# clone the repo
git clone https://github.com/hellgate75/angular2-common-components.git

# change into the repo directory
cd angular2-common-components

# install
npm install

# run
npm run-script build
```


## Detailed Installation

**Step 1: Install Node.js from the [Node Website](http://nodejs.org/).**

We recommend Node version 4.1 or above. You can check your node version by running this:

```bash
$ node -v
vv7.0.4...
```

**Step 2: Install Dependencies**

```bash
npm install
```


**Step 3: Build the code**

```bash
npm run-script build
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install --save https://github.com/hellgate75/angular2-common-components.git

$ npm install --save https://github.com/hellgate75/angular2-common-components-assets.git
(build assets within project directives)

```

and then from your Angular2 `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { SampleModule } from 'angular2-common-components ';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    LibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular2 application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<sampleComponent></sampleComponent>
```

## Development

To generate all `*.js`, `*.js.map` (tha main file is `*index.js`)  files in the folder `dist`:

```bash
npm run-script build
```

To lint all `*.ts` files:

```bash
$ npm run-script lint
```

## Running the Tests

You can run the unit tests with:

```bash
npm run-script test
```

## License
 [MIT](/LICENSE.md)
