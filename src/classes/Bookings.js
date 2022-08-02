// import Customers from '../classes/Customers';

import Rooms from "./Rooms";

class Bookings {

    constructor( bookingsData ) {
       this.id = bookingsData.id;
       this.userID = bookingsData.userID;
       this.date = bookingsData.date;
       this.roomNumber = bookingsData.roomNumber;
    //    this.roomInfo;
       this.userBookingHistory = [ ];
    };

    getCustomersBookingHistory( bookingsData, customersData ) {
        return bookingsData.map( booking => {
            customersData.forEach( customer => {
                if( customer.id === booking.userID ){
                    this.userBookingHistory.push( booking )
                }
            } )
            console.log('HISTORY: ', this.userBookingHistory)
            return this.userBookingHistory
        } )
    }

    // matchBookingsToRooms( roomsData ) {
    //     let match = roomsData.filter( room => room.number === this.roomNumber )
    //     console.log('match', match)
    //     this.roomInfo = new Rooms( match )
    //     console.log('THIS.ROOMINFO: ', this.roomInfo)

    // }
    // match userBookingHistory to roomsData
    // reduce to get the total price
    // getCustomersTotalSpentOnRoom( bookingsData, customersData, roomsData ) {
    //    let stuff = this.getCustomersBookingHistory( bookingsData, customersData )
    //     console.log('STUFF: ', stuff)
    //     return stuff
    // }

}



export default Bookings;