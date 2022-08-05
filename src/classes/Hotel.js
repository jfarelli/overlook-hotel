class Hotel {
    constructor( customersData, roomsData, bookingsData ) {
        this.allCustomers = customersData;
        this.allRooms = roomsData;
        this.allBookings = bookingsData;
        this.roomAvailability = [ ];
        // have a currentUser...maybe??
    };

    checkAvailabilityByDate( date ) { 
        this.roomAvailability = this.allRooms;
        let filteredBookings = this.allBookings.filter( booking => booking.date === date.split( '-' ).join( '/' ) )
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

    filterAvailableRoomsByType( type ) {
        console.log(type, '>>>>>>> TYPE ARGUMENT TAKEN IN IN HOTEL CLASS FILE')
        if( type ) {
            this.roomAvailability = this.roomAvailability.filter( room => room.roomType === type )
            return this.roomAvailability
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