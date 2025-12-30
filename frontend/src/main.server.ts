import { App } from '@/app/app';
import { config } from '@/app/app.config.server';
import { ApplicationRef } from '@angular/core';
import {
  BootstrapContext,
  bootstrapApplication,
} from '@angular/platform-browser';

const bootstrap = (context: BootstrapContext): Promise<ApplicationRef> =>
  bootstrapApplication(App, config, context);

export default bootstrap;
