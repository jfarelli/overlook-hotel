// import chai from 'chai';
import { expect } from 'chai'; 
import Customers from '../src/classes/Customers'; 
import customersData from '../src/sample-data/customers-sample-data';

describe( 'Customer', ( ) => {

  let customer1;
  let customer2;

  beforeEach( ( ) => {
        
    customer1 = new Customers( customersData[0] );
    customer2 = new Customers( customersData[1] );

  } );

  it( 'Should be a function', ( ) => {
    expect( Customers ).to.be.a('function');
  } );

  it( 'Should be an instance of User', ( ) => {
    expect( customer1 ).to.be.an.instanceOf( Customers );

    expect( customer2 ).to.be.an.instanceOf( Customers );
  } );

  it( 'Should take in a Customer\'s ID', ( ) => {
    expect( customer1.id ).to.be.a( "number" );
    expect( customer1.id ).to.equal( customersData[0].id );

    expect( customer2.id ).to.be.a( "number" );
    expect( customer2.id ).to.equal( customersData[1].id );
  } );

  it( 'Should take in a Customer\'s NAME', ( ) => {
    expect( customer1.name ).to.be.a( "string" );
    expect( customer1.name ).to.equal( customersData[0].name );

    expect( customer2.name ).to.be.a( "string" );
    expect( customer2.name ).to.equal( customersData[1].name );
  } );

} );
