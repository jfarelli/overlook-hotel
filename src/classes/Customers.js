// import Bookings from './Bookings';

class Customers {
    constructor( customersData ) {
        this.id = customersData.id;
        this.name = customersData.name
        this.customerBookingHistory = [ ];
    };

    getCustomersBookingHistory( bookingsData, roomsData ) {
        this.customerBookingHistory = bookingsData.filter( booking => booking.userID === this.id )
        this.customerBookingHistory.forEach( booking => {
            booking.getRoomDetailsFromBookings( roomsData )
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