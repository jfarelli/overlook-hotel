import { expect } from 'chai'; 
import Hotel from '../src/classes/Hotel';
import bookingsData from '../src/sample-data/bookings-sample-data';
import customersData from '../src/sample-data/customers-sample-data';
import roomsData from '../src/sample-data/rooms-sample-data';

describe( 'Hotel', ( ) => {

    let hotel;

    beforeEach( ( ) => {

        hotel = new Hotel( customersData, roomsData, bookingsData  );

    } );

    it( 'Should be a function', ( ) => {
      expect( Hotel ).to.be.a( 'function' );
    } );
    
    it( 'Should be an instance of Hotel', ( ) => {
        expect( hotel ).to.be.an.instanceOf( Hotel );
    } );
    
    it( 'Should store all Room Dat in the Hotel', ( ) => {
        expect( hotel.allRooms ).to.be.a( "array" );
        expect( hotel.allRooms ).to.equal( roomsData );
    } ); 
    
    it( 'Should store all Booking Data in the Hotel', ( ) => {
        expect( hotel.allRooms ).to.be.a( "array" );
        expect( hotel.allBookings).to.equal( bookingsData );
    } ); 

    it( 'Should store all Customer Data in the Hotel', ( ) => {
        expect( hotel.allRooms ).to.be.a( "array" );
        expect( hotel.allCustomers).to.equal( customersData );
    } ); 

    it( 'Should store available Rooms in the Hotel', ( ) => {
        expect( hotel.roomAvailability).to.be.a( "array" );
        expect( hotel.roomAvailability).to.deep.equal( [ ] );
    } ); 

    it( 'Should check Room Availability', ( ) => {
        hotel.checkAvailabilityByDate( "2022/01/24" )
        expect( hotel.roomAvailability).to.be.a( "array" );
        expect( hotel.roomAvailability).to.not.deep.equal( [ ] );
        expect( hotel.roomAvailability).to.deep.equal
            ( 
                [
                    {
                        number: 3,
                        roomType: 'suite',
                        bidet: false,
                        bedSize: 'king',
                        numBeds: 1,
                        costPerNight: 491.14
                    },
                    {
                        number: 4,
                        roomType: 'single room',
                        bidet: false,
                        bedSize: 'queen',
                        numBeds: 1,
                        costPerNight: 429.44
                    },
                    {
                        number: 5,
                        roomType: 'single room',
                        bidet: true,
                        bedSize: 'twin',
                        numBeds: 2,
                        costPerNight: 340.17
                    }
                ]
            );
            
        hotel.checkAvailabilityByDate( "2022/02/16" );
        expect( hotel.roomAvailability).to.be.a( "array" );
        expect( hotel.roomAvailability).to.not.deep.equal( [ ] );
        expect( hotel.roomAvailability).to.deep.equal
            ( 
                [
                    {
                        number: 2,
                        roomType: 'junior suite',
                        bidet: false,
                        bedSize: 'full',
                        numBeds: 2,
                        costPerNight: 477.38
                    },
                    {
                        number: 3,
                        roomType: 'suite',
                        bidet: false,
                        bedSize: 'king',
                        numBeds: 1,
                        costPerNight: 491.14
                    },
                    {
                        number: 4,
                        roomType: 'single room',
                        bidet: false,
                        bedSize: 'queen',
                        numBeds: 1,
                        costPerNight: 429.44
                    },
                    {
                        number: 5,
                        roomType: 'single room',
                        bidet: true,
                        bedSize: 'twin',
                        numBeds: 2,
                        costPerNight: 340.17
                    }
                ]
            );
    } ); 

    it( 'Should filter available Rooms in the Hotel by TYPE', ( ) => {
        hotel.checkAvailabilityByDate( "2022/01/24" );
        expect( hotel.filterAvailableRoomsByType( 'suite' ) ).to.be.a( "array" );
        expect( hotel.filterAvailableRoomsByType( 'suite' ) ).to.not.deep.equal( [ ] );
        expect( hotel.filterAvailableRoomsByType( 'suite' ) ).to.deep.equal
            (  
                [
                    {
                        number: 3,
                        roomType: 'suite',
                        bidet: false,
                        bedSize: 'king',
                        numBeds: 1,
                        costPerNight: 491.14
                    }
                  ]
            );
        
        hotel.checkAvailabilityByDate( "2022/02/16" );
        expect( hotel.filterAvailableRoomsByType( 'single room' ) ).to.be.a( "array" );
        expect( hotel.filterAvailableRoomsByType( 'single room' ) ).to.not.deep.equal( [ ] );
        expect( hotel.filterAvailableRoomsByType( 'single room' ) ).to.deep.equal
            (  
                [
                    {
                        number: 4,
                        roomType: 'single room',
                        bidet: false,
                        bedSize: 'queen',
                        numBeds: 1,
                        costPerNight: 429.44
                    },
                    {
                        number: 5,
                        roomType: 'single room',
                        bidet: true,
                        bedSize: 'twin',
                        numBeds: 2,
                        costPerNight: 340.17
                    }
                ]
            );
    } ); 
    
} );