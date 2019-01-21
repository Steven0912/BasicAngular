import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {FuseConfigService} from '../../@fuse/services/config.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    user = 'Chamilo';
    // Campos
    nombre;
    descripcion;
    precio;
    tipo;
    id = '';

    // Estado
    form = false;

    // Tabla Principal
    dataSource: MatTableDataSource<any>;
    displayedColumns = ['Nombre', 'Tipo', 'Precio', 'Acciones'];


    constructor(private _fuseConfigService: FuseConfigService, public af: AngularFireAuth, private router: Router, public db: AngularFirestore, private formBuilder: FormBuilder) {

        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                footer: {
                    hidden: true
                }
            }
        };


        db.collection('products').snapshotChanges().subscribe(list => {
            const packageBookingList = [];
            list.map(item => {
                packageBookingList.push({
                    id: item.payload.doc.id,
                    ...item.payload.doc.data()
                });
            });
            this.dataSource = new MatTableDataSource(packageBookingList);
        });
    }


    storeNewProduct() {
        if (this.id === '') {
            this.db.collection('products').add(
                {
                    Nombre: this.nombre,
                    descripcion: this.descripcion,
                    Precio: this.precio,
                    Tipo: this.tipo
                }
            ).then(status => {
                this.form = false;
                this.nombre = '';
                this.descripcion = '';
                this.precio = '';
                this.tipo = '';
            });
        } else {
            this.db.collection('products').doc(this.id).update(
                {
                    Nombre: this.nombre,
                    descripcion: this.descripcion,
                    Precio: this.precio,
                    Tipo: this.tipo
                }
            ).then(status => {
                this.form = false;
                this.nombre = '';
                this.descripcion = '';
                this.precio = '';
                this.tipo = '';
                this.id = '';
            });
        }

    }

    ngOnInit() {
    }

    newProduct() {
        if (this.form) {
            this.form = false;
        } else {
            this.form = true;
        }
    }

    deleteProduct(item) {
        console.log(item['id']);
        this.db.collection('products').doc(item['id']).delete().then(status => {
            alert('Eliminado Correctamente');
        });
    }

    updateProduct(item) {
        this.id = item['id'];
        this.nombre = item['Nombre'];
        this.descripcion = item['descripcion'];
        this.precio = item['Precio'];
        this.tipo = item['Tipo'];
        this.form = true;
    }
}
