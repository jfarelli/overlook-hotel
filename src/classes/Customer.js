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
            // console.log('this.customerbookinghistory: ', this.customerBookingHistory)
        } )
    }

    getTotalCostOfRoomsForCustomer( ) {
        return this.customerBookingHistory.reduce( ( acc, booking ) => {
            acc += booking.roomDetails.costPerNight
            return acc
        }, 0 ).toFixed( 2 )
    }
}
export default Customers;