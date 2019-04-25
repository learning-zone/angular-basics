import { ProfileEffects } from './profile.effects';
import { ModuleWithProviders } from '@angular/core/src/core';
import { EffectsModule } from '@ngrx/effects';

export const AllEffects: ModuleWithProviders[] = [
  EffectsModule.forRoot([
    ProfileEffects
    ])
]