import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public usuario! : User;

  constructor(  private authService : AuthService,
                private router : Router,
                private store : Store<AppState>) { }

  ngOnInit(): void {

    this.store.select('auth')
      .subscribe(
        ({user}) => this.usuario = user!
    )
    
  }

  logOut(){
    this.authService.logOut()
      .then((logOut) => {
        console.log(logOut);
        this.router.navigate(['/login']);
      })
  }

}
