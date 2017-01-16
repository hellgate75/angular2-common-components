import { Http } from '@angular/http'
import {BackEndService, AuthService} from './services/services';
import {FactoryProvider, Provider} from '@angular/core';
import {Utils} from './utils/utils';

export function BackEndServiceFactory(http: Http) {
    return new BackEndService(http);
}

export function AuthServiceFactory(service: BackEndService) {
    return new AuthService(service);
}

export const BackEndServiceProvider: FactoryProvider = {
    provide: BackEndService,
    deps: [Http],
    useFactory: BackEndServiceFactory
};

export const AuthServiceFactoryProvider: FactoryProvider = {
    provide: AuthService,
    deps: [BackEndService],
    useFactory: AuthServiceFactory
};

export const UtilsFactoryProvider: Provider = {
    provide: AuthService,
    useClass: Utils
};
