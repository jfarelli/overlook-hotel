// import chai from 'chai';
import { expect } from 'chai'; 
import Booking from '../src/classes/Booking';
import Customer from '../src/classes/Customer'; 
import Room from '../src/classes/Room';
import Hotel from '../src/classes/Hotel';
import bookingsData from '../src/sample-data/bookings-sample-data';
import customersData from '../src/sample-data/customers-sample-data';
import roomsData from '../src/sample-data/rooms-sample-data';

describe( 'Hotel', ( ) => {
    let customer1;

    let booking1;

    let room1;

    let hotel1;

    beforeEach( ( ) => {
        
        customer1 = new Customer( customersData[ 0 ] );

        booking1 = new Booking( bookingsData[ 0 ] );

        room1 = new Room( roomsData[ 0 ] );

        hotel1 = new Hotel( customersData, roomsData, bookingsData  )

    } );

    it( 'Should be a function', ( ) => {
      expect( Hotel ).to.be.a('function');
    } );
    
    it( 'Should be an instance of Hotel', ( ) => {
        expect( hotel1 ).to.be.an.instanceOf( Hotel );
    } );
    
    it( 'Should store all Rooms in the Hotel', ( ) => {
        expect( hotel1.allRooms ).to.be.a( "array" );
        expect( hotel1.allRooms ).to.equal( roomsData );
    } ); 
    
    it( 'Should store all Bookings in the Hotel', ( ) => {
        expect( hotel1.allRooms ).to.be.a( "array" );
        expect( hotel1.allBookings).to.equal( bookingsData );
    } ); 

    it( 'Should store all Customer Data in the Hotel', ( ) => {
        expect( hotel1.allRooms ).to.be.a( "array" );
        expect( hotel1.allCustomers).to.equal( customersData );
    } ); 

    it( 'Should store available Rooms in the Hotel', ( ) => {
        expect( hotel1.roomAvailability).to.be.a( "array" );
        expect( hotel1.roomAvailability).to.deep.equal( [ ] );
    } ); 

    it( 'Should check Room Availability', ( ) => {
        hotel1.checkAvailabilityByDate( "2022/01/24" )
        expect( hotel1.roomAvailability).to.be.a( "array" );
        expect( hotel1.roomAvailability).to.deep.equal
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
        hotel1.checkAvailabilityByDate( "2022/02/16" )
        expect( hotel1.roomAvailability).to.be.a( "array" );
        expect( hotel1.roomAvailability).to.deep.equal
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
        hotel1.checkAvailabilityByDate( "2022/01/24" )
        expect( hotel1.filterAvailableRooms( 'suite' ) ).to.be.a( "array" );
        expect( hotel1.filterAvailableRooms( 'suite' ) ).to.deep.equal
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
        
        hotel1.checkAvailabilityByDate( "2022/02/16" )
        expect( hotel1.filterAvailableRooms( 'single room' ) ).to.be.a( "array" );
        expect( hotel1.filterAvailableRooms( 'single room' ) ).to.deep.equal
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