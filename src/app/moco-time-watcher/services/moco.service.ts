import { Injectable, Signal, signal } from '@angular/core';
import { MocoActivity } from '../model';
import { MocoPersistenceService } from './moco-persistence.service';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IMocoService } from './moco.service.interface';
import { format } from 'date-fns';

const ACTIVITIES_ROUTE = '/api/v1/activities';

@Injectable()
export class MocoService implements IMocoService {
  /*
   * Triggers new data request
   */
  public pullActivities = signal<Date | undefined>(undefined);

  private $activities: Observable<MocoActivity[] | undefined> = toObservable(
    this.pullActivities,
  ).pipe(
    switchMap((date) => {
      if (
        !date ||
        !this.settings.mocoSettings()?.mocoAppBaseAddress ||
        !this.settings.mocoSettings()?.apiKey
      ) {
        return of(undefined);
      }
      const dateParameter = format(date, 'yyyy-MM-dd');
      const request = `${
        this.settings.mocoSettings()?.mocoAppBaseAddress
      }${ACTIVITIES_ROUTE}?from=${dateParameter}&to=${dateParameter}`;

      const headers = {
        Authorization: `Bearer ${this.settings.mocoSettings()?.apiKey}`,
        'Content-Type': 'application/json',
      };

      console.log(request, headers);

      return this.http
        .get<MocoActivity[]>(request, { headers: headers })
        .pipe(catchError(this.handleError));
    }),
  );
  /**
   * Contains activities
   */
  public activities: Signal<MocoActivity[] | undefined> = toSignal(this.$activities);

  constructor(private http: HttpClient, private settings: MocoPersistenceService) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
