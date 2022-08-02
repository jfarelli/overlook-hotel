// import chai from 'chai';
import { expect } from 'chai'; 
import Rooms from '../src/classes/Rooms'; 
import roomsData from '../src/sample-data/rooms-sample-data';

describe( 'Rooms', ( ) => {

  let room1;
  let room2;

  beforeEach( ( ) => {
        
    room1 = new Rooms( roomsData[0] );
    room2 = new Rooms( roomsData[1] );

  } );

  it( 'Should be a function', ( ) => {
    expect( Rooms ).to.be.a('function');
  } );

  it( 'Should be an instance of Rooms', ( ) => {
    expect( room1 ).to.be.an.instanceOf( Rooms );

    expect( room2 ).to.be.an.instanceOf( Rooms );
  } );

  it( 'Should have a Room NUMBER', ( ) => {
    expect( room1.number ).to.be.a( "number" );
    expect( room1.number ).to.equal( roomsData[0].number );

    expect( room2.number ).to.be.a( "number" );
    expect( room2.number ).to.equal( roomsData[1].number );
  } );

  it( 'Should show the Room TYPE', ( ) => {
    expect( room1.roomType ).to.be.a( "string" );
    expect( room1.roomType ).to.equal( roomsData[0].roomType );

    expect( room2.roomType ).to.be.a( "string" );
    expect( room2.roomType ).to.equal( roomsData[1].roomType );
  } );

  it( 'Should show if there\'s a BIDET in the Room', ( ) => {
    expect( room1.bidet ).to.be.a( "boolean" );
    expect( room1.bidet ).to.equal( roomsData[0].bidet );

    expect( room2.bidet ).to.be.a( "boolean" );
    expect( room2.bidet ).to.equal( roomsData[1].bidet );
  } );

  it( 'Should show the BED-SIZE in the Room', ( ) => {
    expect( room1.bedSize ).to.be.a( "string" );
    expect( room1.bedSize ).to.equal( roomsData[0].bedSize );

    expect( room2.bedSize ).to.be.a( "string" );
    expect( room2.bedSize ).to.equal( roomsData[1].bedSize );
  } );

  it( 'Should show the NUMBER of BEDS in the Room', ( ) => {
    expect( room1.numBeds ).to.be.a( "number" );
    expect( room1.numBeds ).to.equal( roomsData[0].numBeds );

    expect( room2.numBeds ).to.be.a( "number" );
    expect( room2.numBeds ).to.equal( roomsData[1].numBeds );
  } );

  it( 'Should show the COST PER NIGHT of the Room', ( ) => {
    expect( room1.costPerNight ).to.be.a( "number" );
    expect( room1.costPerNight ).to.equal( roomsData[0].costPerNight );

    expect( room2.costPerNight ).to.be.a( "number" );
    expect( room2.costPerNight ).to.equal( roomsData[1].costPerNight );
  } );

} );