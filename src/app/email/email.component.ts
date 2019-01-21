import {Component, OnInit} from '@angular/core';
import {moveIn, fallIn} from '../router.animations';
import {Router} from '@angular/router';

// Firabse Auth
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {auth} from 'firebase/app';
import {FuseConfigService} from '../../@fuse/services/config.service';

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.scss'],
    animations: [moveIn(), fallIn()],
    host: {'[@moveIn]': ''}
})
export class EmailComponent implements OnInit {

    state: string = '';
    error: any;

    constructor(public afAuth: AngularFireAuth, private router: Router, private _fuseConfigService: FuseConfigService) {

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

    onSubmit(formData) {
        if (formData.valid) {
            console.log(formData.value);

            this.afAuth.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password).then(status => {
                console.log(status);
                this.router.navigate(['/products']);
            }, err => {
                this.error = 'Credenciales incorrectas';
            });
        }
    }

    ngOnInit() {
    }

}
