import {Component, OnInit} from '@angular/core';
import {fallIn, moveIn} from '../router.animations';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {FuseConfigService} from '../../@fuse/services/config.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [moveIn(), fallIn()],
    host: {'[@moveIn]': ''}
})
export class SignupComponent implements OnInit {

    state = '';
    error: any;

    constructor(public afAuth: AngularFireAuth, private router: Router, public db: AngularFirestore, private _fuseConfigService: FuseConfigService) {

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

            this.afAuth.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password).then(status => {
                console.log(status);

                this.afAuth.authState.subscribe(user => {
                    if (user) {
                        this.db.collection('users').add(
                            {
                                name: formData.value.name,
                                email: formData.value.email,
                                uid: user.uid,
                            }
                        ).then(succes => {
                            this.router.navigate(['/products']);
                        });
                    } else {
                        // Empty the value when user signs out
                        this.error = 'No se pudo obtener el UID';
                    }
                });

            }, err => {
                this.error = 'Error al crear';
            });
        }
    }

    ngOnInit() {
    }

}
