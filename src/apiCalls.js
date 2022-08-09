export let getData = ( dataType ) => {
    return fetch( `http://localhost:3001/api/v1/${ dataType }` )
        .then( response => response.json( ) )
        .catch( error => console.log( 'ERROR: ', error ) );
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
                window.alert( 'We appologize, but the server is currently down. We\'re working on the issue.' )
                throw new Error( 'Server is currently down. Please try again later.' );
            } else {
                return response.json( );
            }
        } )
        .catch( error => console.log( 'ERROR: ', error ) );
}