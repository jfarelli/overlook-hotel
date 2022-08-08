import Booking from './Booking';

class Customer {
    constructor( customersData ) {
        this.id = customersData.id;
        this.name = customersData.name;
        this.customerBookingHistory = [ ];
    };

    getCustomerBookingHistory( bookingsData, roomsData ) {
        this.customerBookingHistory = bookingsData
            .filter( booking => booking.userID === this.id )
                .map( item => new Booking( item ) );
        this.customerBookingHistory.forEach( booking => {
            booking.getRoomDetailsFromBookings( roomsData )
        } );
        this.customerBookingHistory.sort( (a, b) => {
            a = a.date.split( '/' );
            b = b.date.split( '/' );
            return a[ 0 ] - b[ 0 ] || a[ 1 ] - b[ 1 ] || a[ 2 ] - b[ 2 ];
        } );
    }

    getTotalCostOfRoomsForCustomer( ) {
        return this.customerBookingHistory.reduce( ( acc, booking ) => {
            acc += booking.roomDetails.costPerNight;
            return acc;
        }, 0 ).toLocaleString( 'en-US' );
    }

}
export default Customer;