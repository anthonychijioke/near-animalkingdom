import React from 'react';


const CarContext = React.createContext(
    {
        cars: [

            {
                id: 1,
                name: 'Toyota Sedan 2011',
                image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=847&q=80',
                price: 29.99,
                isUsed: false,
                isSale: true,
                isAuction: false,
                bidDate: new Date().toDateString()
            },
            {
                id: 2,
                name: 'Ferrari',
                image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
                price: 50.95,
                isUsed: true,
                isSale: true,
                isAuction: false,
                bidDate: new Date().toDateString()
            },
            {
                id: 3,
                name: 'Ferrari',
                image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
                price: 50.00,
                isUsed: false,
                isSale: false,
                isAuction: true,
                bidDate: new Date().toDateString()
            }

        ]
    })


export default CarContext;
