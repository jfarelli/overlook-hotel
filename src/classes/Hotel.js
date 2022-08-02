import Bookings from "./Bookings";

class Hotel {
    constructor( customersData, roomsData, bookingsData ) {
        // have a currentUser...maybe??
        this.allRooms = roomsData;
        this.allBookings = bookingsData;
        this.allCustomers = customersData;
        this.roomAvailability = [ ];
    };

    checkAvailabilityByDate( date ) { // KEEP FUNCTION IN MIND IN CASE DATE NEEDS TO BE CONVERTED LATER!!!
        this.roomAvailability = this.allRooms;
        let filteredBookings = this.allBookings.filter( booking => booking.date === date )
        let checkRoomAvailability = ( bookedRoom ) => {
			return filteredBookings.reduce( ( acc, filteredBooking ) => {
				if( filteredBooking.roomNumber === bookedRoom.number ) {
					acc = false
				} 
				return acc
			}, true )
		}
		this.roomAvailability = this.roomAvailability.filter( bookedRoom => checkRoomAvailability( bookedRoom ) )
		return this.roomAvailability
    }

}



export default Hotel;














// saveBookings( bookingsData ) {
//     console.log('BOOKINGSDATA: ', bookingsData)
//     return bookingsData.map( booking => {
//         return new Bookings( booking )
//     } )
// }