import Booking from "./Booking";

class Hotel {
    constructor( customersData, roomsData, bookingsData ) {
        this.allCustomers = customersData;
        this.allRooms = roomsData;
        this.allBookings = bookingsData;
        this.roomAvailability = [ ];
        // have a currentUser...maybe??
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

    filterAvailableRooms( type ) {
        if( type ) {
            return this.roomAvailability.filter( room => room.roomType === type )
        }
    }
}

export default Hotel;














// saveBookings( bookingsData ) {
//     console.log('BOOKINGSDATA: ', bookingsData)
//     return bookingsData.map( booking => {
//         return new Booking( booking )
//     } )
// }