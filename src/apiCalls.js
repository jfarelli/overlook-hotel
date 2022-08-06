export let getData = ( dataType ) => {
    return fetch( `http://localhost:3001/api/v1/${ dataType }` )
        .then( response => response.json( ) )
        .catch( error => console.log( error ) );
}


export let postData = ( data ) => {
    return fetch( 'http://localhost:3001/api/v1/bookings', {
        method: 'POST',
        body: JSON.stringify( data ),
        headers: {
            'Content-Type': 'application/json'
        }
    } )
        .then( response => {
            if( !response.ok ) {
                throw new Error( 'We can\'t process your Booking request at this time. Please try again later.' )
            } else {
                return response.json( ) 
            }
        } )
        .catch( error => console.log( error ) );
}