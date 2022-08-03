import Room from "./Room";

class Booking {
    constructor( bookingsData ) {
       this.id = bookingsData.id;
       this.userID = bookingsData.userID;
       this.date = bookingsData.date;
       this.roomNumber = bookingsData.roomNumber;
       this.roomDetails;
    };

    getRoomDetailsFromBookings( roomsData ) {
        let roomAndBookingMatch = roomsData.find( room => room.number === this.roomNumber )
        this.roomDetails = new Room( roomAndBookingMatch )
    }



}



export default Booking;