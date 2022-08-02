import Rooms from "./Rooms";

class Bookings {
    constructor( bookingsData ) {
       this.id = bookingsData.id;
       this.userID = bookingsData.userID;
       this.date = bookingsData.date;
       this.roomNumber = bookingsData.roomNumber;
       this.roomDetails;
    };

    getRoomDetailsFromBookings( roomsData ) {
        let match = roomsData.find( room => room.number === this.roomNumber )
        this.roomDetails = new Rooms( match )
    }

}



export default Bookings;