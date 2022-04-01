import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  public usuario! : User;
  public suscripcion! : Subscription;

  constructor(  private authService : AuthService,
                private store : Store<AppState>) { }
 

  ngOnInit(): void {
    this.suscripcion = this.store.select('auth')
    .pipe(
      filter( ({user}) => user != null)
    )
    .subscribe(
      ({user}) => this.usuario = user!
  )
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

}
