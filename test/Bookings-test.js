// import chai from 'chai';
import { expect } from 'chai'; 
import Bookings from '../src/classes/Bookings'; 
import Rooms from '../src/classes/Rooms';
import bookingsData from '../src/sample-data/bookings-sample-data';
import customersData from '../src/sample-data/customers-sample-data';
import roomsData from '../src/sample-data/rooms-sample-data';

describe( 'Bookings', ( ) => {

  let booking1;
  let booking2;
  let room1;

  beforeEach( ( ) => {
        
    booking1 = new Bookings( bookingsData[ 0 ] );
    booking2 = new Bookings( bookingsData[ 1 ] );

    // room1 = new Rooms( roomsData[ 0 ] )

  } );

  it( 'Should be a function', ( ) => {
    // console.log('ROOM1: ', room1)
    expect( Bookings ).to.be.a('function');
  } );

  it( 'Should be an instance of User', ( ) => {
    expect( booking1 ).to.be.an.instanceOf( Bookings );

    expect( booking2 ).to.be.an.instanceOf( Bookings );
  } );

  it( 'Should have a Booking ID', ( ) => {
    expect( booking1.id ).to.be.a( "string" );
    expect( booking1.id ).to.equal( bookingsData[ 0 ].id );

    expect( booking2.id ).to.be.a( "string" );
    expect( booking2.id ).to.equal( bookingsData[ 1 ].id );
  } );

  it( 'Should have a userID attached to the Booking', ( ) => {
    expect( booking1.userID ).to.be.a( "number" );
    expect( booking1.userID ).to.equal( bookingsData[ 0 ].userID );

    expect( booking2.userID ).to.be.a( "number" );
    expect( booking2.userID ).to.equal( bookingsData[ 1 ].userID );
  } );

  it( 'Should have a DATE attached to the Booking', ( ) => {
    expect( booking1.date ).to.be.a( "string" );
    expect( booking1.date ).to.equal( bookingsData[ 0 ].date );

    expect( booking2.date ).to.be.a( "string" );
    expect( booking2.date ).to.equal( bookingsData[ 1 ].date );
  } );

  it( 'Should have a ROOM NUMBER attached to the Booking', ( ) => {
    expect( booking1.roomNumber ).to.be.a( "number" );
    expect( booking1.roomNumber ).to.equal( bookingsData[ 0 ].roomNumber );

    expect( booking2.roomNumber ).to.be.a( "number" );
    expect( booking2.roomNumber ).to.equal( bookingsData[ 1 ].roomNumber );
  } );

  it( 'Should be able to store a Customer\'s Booking HISTORY', ( ) => {
    expect( booking1.userBookingHistory ).to.be.a( "array" );
    expect( booking1.userBookingHistory ).to.deep.equal( [ ] );

    expect( booking2.userBookingHistory ).to.be.a( "array" );
    expect( booking2.userBookingHistory ).to.deep.equal( [ ] );
  } );

  it( 'Should get the user\'s Booking HISTORY', ( ) => {
    booking1.getCustomersBookingHistory( bookingsData, [ customersData[ 0 ] ] )
    expect( booking1.userBookingHistory.length ).to.equal( 3 );
    expect( booking1.userBookingHistory ).to.be.a( "array" );
    expect( booking1.userBookingHistory ).to.deep.equal
    (  
      [
        {
          id: '5fwrgu4i7k55hl6sz',
          userID: 1,
          date: '2022/04/22',
          roomNumber: 2
        },
        {
          id: '5fwrgu4i7k55hl6t8',
          userID: 1,
          date: '2022/02/05',
          roomNumber: 12
        },
        {
          id: '5fwrgu4i7k55hl6tc',
          userID: 1,
          date: '2022/01/30',
          roomNumber: 13
        }
      ]
    );

    booking2.getCustomersBookingHistory( bookingsData, [ customersData[ 1 ] ] )
    expect( booking2.userBookingHistory.length ).to.equal( 2 );
    expect( booking2.userBookingHistory ).to.be.a( "array" );
    expect( booking2.userBookingHistory ).to.deep.equal
    (  
      [
        {
          id: '5fwrgu4i7k55hl6t5',
          userID: 2,
          date: '2022/01/24',
          roomNumber: 24
        },
        {
          id: '5fwrgu4i7k55hl6t6',
          userID: 2,
          date: '2022/01/10',
          roomNumber: 2
        }
      ]
    );
  } );

  // it( 'Should match Booking to Rooms', ( ) => {
  //   booking1.matchBookingsToRooms( roomsData )
  //   expect(booking1.roomInfo).to.be.a.instanceOf( Rooms )
  //   expect(booking1.roomInfo.roomNumber).to.equal( room1.number )
  //   console.log('ROOM1: ', room1.number)
  // } );

  // it( 'Should be able to calculate TOTAL COST of a Customer\'s Booking HISTORY', ( ) => {
  //   booking1.getCustomersBookingHistory( bookingsData, [ customersData[ 0 ] ] )
  //   expect( booking1.userBookingHistory.length ).to.equal( 3 );
  //   expect( booking1.userBookingHistory ).to.be.a( "array" );
  //   expect( booking1.getCustomersTotalSpentOnRoom( bookingsData, [ customersData[ 0 ] ], roomsData ) ).to.deep.equal(  );

  //   // expect( booking2.userBookingHistory ).to.be.a( "array" );
  //   // expect( booking2.userBookingHistory ).to.deep.equal( [ ] );
  // } );

} );