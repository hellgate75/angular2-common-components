import {Http, Response, Headers, RequestOptionsArgs} from '@angular/http';
import {Injectable, Inject} from '@angular/core';
import { SESSION_KEY } from '../utils/utils';
import {Observable, Subject, Subscriber} from 'rxjs';
import {OBJECT_SERVICE_SERVER_CONF, USER_BIND_SESSION_KEY} from '../shared/constants';
import {ServiceServer, ServiceServerConfig} from '../shared/app-env.interface';
import { Request, FILTER_TYPE, REQUEST_TYPE } from '../models/back-end-model';
import { Cloneable, Factory, CloneableCreator, ICloneableConstructor } from '../models/base-model';

declare const JSON: any;

@Injectable()
export class BackEndService {

  /**
   * Represent the Back-End Service
   * @constructor
   * @param {string} sessionKey - the current session key
   * @param {ServiceServer} serviceConfig - The Service Serer configuration
   * @param {Http} http - the Http service
   *
   */
  constructor(@Inject(USER_BIND_SESSION_KEY) public sessionKey: string,
              @Inject(OBJECT_SERVICE_SERVER_CONF) public serviceServerConfig: ServiceServerConfig,
              private http: Http) {
    if (!!this.sessionKey) {
      this.sessionKey = SESSION_KEY;
    }
  }

  /**
   * requireServiceDML() - method that realize the dml command statement.
   * @param {Subject<boolean>} expectedSubject - subscriber of the response status
   * @param {Request} request - request class of the element
   *
   */
  requireServiceDML(expectedSubject: Subject<boolean>, server: string, request: Request):
                                                                                              Subscriber<Response> {
    if (request.requestType !== REQUEST_TYPE.INSERT && request.requestType !== REQUEST_TYPE.UPDATE &&
              request.requestType !== REQUEST_TYPE.DELETE) {
      throw 'requireServiceDML: Unexpected request type : ' + request.requestType;
    }
    let serviceConfig: ServiceServer = this.serviceServerConfig.servers.get(server);
    if (!serviceConfig) {
      throw 'requireServiceDML: Server Configuration not found for : ' + server;
    }
    /* tslint:disable */
    let completed: boolean = false;
    /* tslint:enable */
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    if (request.requestType === REQUEST_TYPE.INSERT) {
      let config: RequestOptionsArgs = {
        url: (!!serviceConfig.protocol ? serviceConfig.protocol : 'http')
        + '://' + (!!serviceConfig.host ? serviceConfig.host : 'localhost') +
        (!!serviceConfig.port ? ':' + serviceConfig.port : '') + '/' + request.service ,
        method: 'POST',
        headers: headers
      };
      return <Subscriber<Response>> this.http.post(
        (!!serviceConfig.protocol ? serviceConfig.protocol : 'http') + '://'
        + (!!serviceConfig.host ? serviceConfig.host : 'localhost') +
        (!!serviceConfig.port ? ':' + serviceConfig.port : '')
        + '/' + request.service, JSON.stringify(request.item), config)
        .subscribe( (response: Response) => {
            completed = response.ok;
            expectedSubject.next(completed);
          },
          (err: any) => expectedSubject.next(false),
          () => expectedSubject.next(completed)
        );
    } else if (request.requestType === REQUEST_TYPE.UPDATE) {
      let config: RequestOptionsArgs = {
        url: (!!serviceConfig.protocol ? serviceConfig.protocol : 'http') + '://'
        + (!!serviceConfig.host ? serviceConfig.host : 'localhost') +
        (!!serviceConfig.port ? ':' + serviceConfig.port : '')
        + '/' + request.service + '/' + request.itemId,
        method: 'PUT',
        headers: headers
      };
      return <Subscriber<Response>> this.http.put(
        (!!serviceConfig.protocol ? serviceConfig.protocol : 'http') + '://'
        + (!!serviceConfig.host ? serviceConfig.host : 'localhost') +
        (!!serviceConfig.port ? ':' + serviceConfig.port : '')
        + '/' + request.service + '/' + request.itemId, JSON.stringify(request.item), config)
        .subscribe( (response: Response) => {
            completed = response.ok;
            expectedSubject.next(completed);
          },
          (err: any) => expectedSubject.next(false),
          () => expectedSubject.next(completed)
        );
    } else  if (request.requestType === REQUEST_TYPE.DELETE) {
      return <Subscriber<Response>> this.http.delete(
        (!!serviceConfig.protocol ? serviceConfig.protocol : 'http') + '://'
        + (!!serviceConfig.host ? serviceConfig.host : 'localhost') +
        (!!serviceConfig.port ? ':' + serviceConfig.port : '')
        + '/' + request.service + '/' + request.itemId)
        .subscribe( (response: Response) => {
            completed = response.ok;
            expectedSubject.next(completed);
          },
          (err: any) => expectedSubject.next(false),
          () => expectedSubject.next(completed)
        );
    }
    return null;
  }

  /**
  * requireServiceQuery() - template method that realize the query statement.
  * @param {Subject<A[]>} expectedSubject - subscriber of the discovered template elements
  * @param {Request} request - request class of the element
  * @param {number} timeout (optional) - timeout for the accumulation or nothing (or zero) if not provided
  */
  /* tslint:disable */
  requireServiceQuery<A extends Cloneable>(expectedSubject: Subject<A[]>, server: string, request: Request,
                     constructor: ICloneableConstructor<A>, timeout?: number): Subscriber<Response> {
    let creator: CloneableCreator<A> = new CloneableCreator<A>(constructor);
    /* tslint:enable */
    if (request.requestType !== REQUEST_TYPE.QUERY && request.requestType !== REQUEST_TYPE.FULL) {
      throw 'requireServiceQuery: Unexpected request type : ' + request.requestType;
    }
    if (!this.serviceServerConfig || !this.serviceServerConfig.servers || !this.serviceServerConfig.servers.get) {
      throw 'requireServiceQuery: Server Configuration invalid for server : ' + server;
    }
    let serviceConfig: ServiceServer = this.serviceServerConfig.servers.get(server);
    if (!serviceConfig) {
      throw 'requireServiceQuery: Server Configuration not found for : ' + server;
    }
    let searchKey: string;
    let searchValue: any;
    let searchText: string;
    /* tslint:disable */
    let qryOptions: string = '';
    let qrySortOptions: string = '';
    /* tslint:enable */

    if (request.requestType === REQUEST_TYPE.QUERY) {
      if (!!request.filter) {
        switch (request.filter.type) {
          case FILTER_TYPE.KEYVALUE:
            searchKey  = request.filter.searchKey;
            searchValue  = request.filter.searchValue;
            break;
          case FILTER_TYPE.LIKE:
            searchKey  = request.filter.searchKey + '_like';
            searchValue  = request.filter.searchValue;
            break;
          case FILTER_TYPE.FULL_TEXT:
            searchText = request.filter.fullText;
            break;
          case FILTER_TYPE.LESSTHANEQ:
            searchKey  = request.filter.searchKey + '_lte';
            searchValue  = request.filter.searchValue;
            break;
          case FILTER_TYPE.GREATERTHANEQ:
            searchKey  = request.filter.searchKey + '_gte';
            searchValue  = request.filter.searchValue;
            break;
          case FILTER_TYPE.NOT_EQUALS:
            searchKey  = request.filter.searchKey + '_ne';
            searchValue  = request.filter.searchValue;
            break;
          default:
            break;
        }
      }
    }
    if (!!request.paging) {
      let pageQuery: string = (!!searchKey || !!searchText ? '&' : '?');
      if (!!request.paging.page) {
        pageQuery += '_page=' + request.paging.page + (!!request.paging.size ? '&' : '');
      }
      if (!!request.paging.size) {
        pageQuery += '_limit=' + request.paging.size;
      }
      if ( pageQuery.length > 2 ) {
        qryOptions = pageQuery;
      }
    }
    if (!!request.sorter) {
      let sortQuery: string = (!!searchKey || !!searchText || qryOptions.length ? '&' : '?');
      if (!!request.sorter.key) {
        sortQuery += '_sort=' + request.sorter.key + '&_order=' + ( request.sorter.ascending ? 'ASC' : 'DESC' );
      }
      if ( sortQuery.length > 2 ) {
        qrySortOptions = sortQuery;
      }
    }
    let httpCall: Observable<Response> = this.http.get((!!serviceConfig.protocol ? serviceConfig.protocol : 'http')
      + '://' + (!!serviceConfig.host ? serviceConfig.host : 'localhost') +
      (!!serviceConfig.port ? ':' + serviceConfig.port : '')
      + '/' + request.service + (!!searchKey ?  '?' + searchKey +
      '=' + (!!searchValue ? searchValue : '') : '') + (!!searchText ? '?q=' + searchText : '')
      + qryOptions + qrySortOptions);
    /* tslint:disable */
    if (timeout) {
      httpCall.timeout( timeout );
    }
    /* tslint:enable */
    return <Subscriber<Response>> httpCall
      .subscribe( (response: Response) => {
          let respValue: any[] = response.json();
          let allValues: A[] = [];
          respValue.forEach((next: any) => allValues.push(Factory.newCloneable<A>(next, creator)));
          expectedSubject.next(allValues);
        },
        (err: any) => expectedSubject.error(err),
        () => expectedSubject.complete()
      );
  }


  getEntireDbObserver(server: string): Observable<Response> {
    let serviceConfig: ServiceServer = this.serviceServerConfig.servers.get(server);
    if (!serviceConfig) {
      throw 'getEntireDbObserver: Server Configuration not found for : ' + server;
    }
    return this.http.get((!!serviceConfig.protocol ? serviceConfig.protocol : 'http')
    + '://' + (!!serviceConfig.host ? serviceConfig.host : 'localhost')
    + (!!serviceConfig.port ? ':' + serviceConfig.port : '') + '/db' );
  }
}
