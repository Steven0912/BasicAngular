import {Component, OnInit, HostBinding} from '@angular/core';

// rutas
import {Router} from '@angular/router';

// Firabse Auth
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {auth} from 'firebase/app';
import {FuseConfigService} from '../../@fuse/services/config.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    error: any;

    constructor(private _fuseConfigService: FuseConfigService, public afAuth: AngularFireAuth, private router: Router, public db: AngularFirestore) {

        this.afAuth.authState.subscribe(status => {
            if (status) {
                this.router.navigateByUrl('/products');
            }
        });


        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                }
            }
        };
    }

    ngOnInit() {
    }


    loginFb() {
        this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then(succes => {

            this.db.collection('users', qr => qr.where('uid', '==', succes.user.uid)).valueChanges().subscribe(data => {
                if (data.length === 0) {
                    this.db.collection('users').add(
                        {
                            name: succes.user.displayName,
                            email: succes.user.email,
                            photo: succes.user.photoURL,
                            uid: succes.user.uid,
                        }
                    );
                }
            });

        }, error => {
            this.error = 'Facebook aún no está configurado para producción';
        });
    }

    loginGoogle() {
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(succes => {

            this.db.collection('users', qr => qr.where('uid', '==', succes.user.uid)).valueChanges().subscribe(data => {
                if (data.length === 0) {
                    this.db.collection('users').add(
                        {
                            name: succes.user.displayName,
                            email: succes.user.email,
                            photo: succes.user.photoURL,
                            uid: succes.user.uid,
                        }
                    );
                }
            });

        }, error => {
            this.error = 'Problemas con el registro mediante cuenta de Google';
        });
    }

    loginEmail() {
        this.router.navigate(['/', 'login-email']);
    }

}
