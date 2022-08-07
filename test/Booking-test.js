import { expect } from 'chai'; 
import Booking from '../src/classes/Booking'; 
import Room from '../src/classes/Room';
import bookingsData from '../src/sample-data/bookings-sample-data';
import roomsData from '../src/sample-data/rooms-sample-data';

describe( 'Booking', ( ) => {

  let booking1;
  let booking2;

  beforeEach( ( ) => {
    
    booking1 = new Booking( bookingsData[ 0 ] );
    booking2 = new Booking( bookingsData[ 1 ] );

  } );

  it( 'Should be a function', ( ) => {
    expect( Booking ).to.be.a('function');
  } );

  it( 'Should be an instance of User', ( ) => {
    expect( booking1 ).to.be.an.instanceOf( Booking );

    expect( booking2 ).to.be.an.instanceOf( Booking );
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


  it( 'Should match Booking to Room', ( ) => {
    booking1.getRoomDetailsFromBookings( roomsData );
    expect( booking1.roomDetails ).to.be.a.instanceOf( Room );
    expect( booking1.roomDetails.number ).to.equal( 1 );

    booking2.getRoomDetailsFromBookings( roomsData );
    expect( booking2.roomDetails ).to.be.a.instanceOf( Room );
    expect( booking2.roomDetails.number ).to.equal( 2 );
  } );

} );