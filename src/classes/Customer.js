import Booking from './Booking';

class Customers {
    constructor( customersData ) {
        this.id = customersData.id;
        this.name = customersData.name
        this.customerBookingHistory = [ ];
    };

    getCustomersBookingHistory( bookingsData, roomsData ) {
        this.customerBookingHistory = bookingsData
            .filter( booking => booking.userID === this.id )
                .map( item => new Booking( item ) )
        this.customerBookingHistory.forEach( booking => {
            booking.getRoomDetailsFromBookings( roomsData )
        } )
    }

    getTotalCostOfRoomsForCustomer( ) {
        return this.customerBookingHistory.reduce( ( acc, booking ) => {
            acc += booking.roomDetails.costPerNight
            return acc
        }, 0 ).toLocaleString( 'en-US' )
    }

}
export default Customers;