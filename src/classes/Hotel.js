class Hotel {
    constructor( customersData, roomsData, bookingsData ) {
        this.allCustomers = customersData;
        this.allRooms = roomsData;
        this.allBookings = bookingsData;
        this.roomAvailability = [ ];
    };

    checkAvailabilityByDate( date ) { 
        this.roomAvailability = this.allRooms;
        let filteredBookings = this.allBookings.filter( booking => booking.date === date.split( '-' ).join( '/' ) );
        let checkRoomAvailability = ( bookedRoom ) => {
			return filteredBookings.reduce( ( acc, filteredBooking ) => {
				if( filteredBooking.roomNumber === bookedRoom.number ) {
					acc = false;
				} 
				return acc;
			}, true );
		}
		this.roomAvailability = this.roomAvailability.filter( bookedRoom => checkRoomAvailability( bookedRoom ) );
		return this.roomAvailability;
    }

    filterAvailableRoomsByType( type ) {
        if( type ) {
            return this.roomAvailability.filter( room => room.roomType === type );
        }
    }
}

export default Hotel;
