import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'FUNCIONALIDADES',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [

            {
                id       : 'product',
                title    : 'Productos',
                type     : 'item',
                icon     : 'email',
                url      : '/products',
                badge    : {
                    title    : '5',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },

            {
                id       : 'sample',
                title    : 'Ejemplo básico',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/sample',
                badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            }
        ]
    }
];
