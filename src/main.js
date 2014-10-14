"use strict"
// Iterators require added by me

var menu = require('node-menu');
var app = require('./app.js');

var building = new app.Building("Waterfront Tower");
var people = [];

var findUnit = function (unit_number){
  for (var i = 0; i < building.units.length; i++){
    if (building.units[i].number == unit_number) {
      return building.units[i];
    }
  }
  return null;
};


var findPerson = function(name){
  for (var i = 0; i < people.length;i++){
    if(people[i].name === name){
      return people[i];
    }
  };
  return null;
};

// Add some seed data
people.push(new app.Person("Anna", "765-4321"));
var john = new app.Manager("John", "700-4321");
building.setManager(john);
people.push(john);
var devin = new app.Tenant("Devin", "765-1234");
devin.addReference(new app.Person("Carl", "415 3536 222"));
devin.addReference(new app.Person("Steve", "415 1111 222"));
people.push(devin);
people.push(new app.Tenant("Steve", "744-1234"));

building.units.push(new app.Unit("12", building, 400, 2000));
building.units.push(new app.Unit("13", building, 800, 3000));
building.units.push(new app.Unit("14", building, 1800, 4500));
// Above added from Markus via HipChat

// --------------------------------
menu.addDelimiter('-', 40, building.address + " rental app");



menu.addItem('Add manager', 
  function(name, contact) {
    var aManager = new app.Manager(name, contact);
    aManager.addBuilding(building);
    building.setManager(aManager);
    people.push(new app.Manager(name, contact));
  },
  null, 
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Add tenant', 
  function(name, contact) {
    people.push(new app.Tenant(name, contact));
  },
  null, 
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Show tenants:', 
  function() {
    for (var i = 0; i <= people.length; i++) {
      if (people[i] instanceof app.Tenant){
        console.log("\n" + people[i].name + " " + people[i].contact);
        var references = people[i].references;
        if(!references) 
          {
            continue;
          }
        for (var j = references.length - 1; j >= 0; j--) {
          console.log("-> Reference: " + references[j].name + " " + references[j].contact);
        };
      }
    }
  }
);

menu.addItem('Add unit', 
  function(number, sqft, rent) {
    var aUnit = new app.Unit(number, building, sqft, rent);
    building.units.push(aUnit);
  },
  null, 
  [{'name': 'number', 'type': 'string'},
    {'name': 'sqft', 'type': 'numeric'}, 
    {'name': 'rent', 'type': 'numeric'}]
);

menu.addItem('Show all units', 
  function() {
    for(var i = building.units.length - 1; i >= 0; i--) {
      if (building.units[i].tenant !== null){
      console.log(" tenant: " + building.units[i].tenant.name +
      			  " num: " + building.units[i].number + 
                  " sqft: " + building.units[i].sqft +
                  " rent: $" + building.units[i].rent);
    } else {
      console.log(" tenant: " + building.units[i].tenant +
              " num: " + building.units[i].number + 
                  " sqft: " + building.units[i].sqft +
                  " rent: $" + building.units[i].rent);
    }
    } 
  } 
);

menu.addItem('Show available units', 
  function() {
    for (var i = building.units.length -1; i >= 0; i--) {
      if (building.units[i].tenant === null)
        console.log(" tenant: " + building.units[i].tenant +
              " num: " + building.units[i].number + 
                  " sqft: " + building.units[i].sqft +
                  " rent: $" + building.units[i].rent );
    }
    } 
);

menu.addItem('(implement me) Add tenant reference', 
  function (tenant_name, ref_name) {
    var tenant = findPerson(tenant_name);
    if (tenant !== null) {
      var ref = findPerson(ref_name);
         if (ref !== null) {
          // ref = new app.Person(ref_name, ref_contact);
          tenant.addReference(ref);
          console.log("Congrats! You've been added");
          } // end inner if

          else {
           console.log ("reference doesn't exist"); 
          } // end inner else
          
    } // end outer if 
    
    else{
      console.log ("tenant doesn't exist");
    } //end outer else
  
  }, //end function

    null, 
    [{'name': 'tenant_name', 'type': 'string'},
    {'name': 'ref_name', 'type': 'string'}
    ] 
);

menu.addItem('(implement me) Move tenant in unit',
  function(unit_number, tenant_name) {
      // find tenant and unit objects, use building's addTenant() function.
      var tenant = findPerson(tenant_name);
      var unit = findUnit(unit_number);
      console.log(unit);
      if (unit.available() && tenant !== null){
        building.addTenant(unit, tenant);
        console.log(tenant_name + " is now the tenant of unit#" + unit_number);
        }
      },
    null,
    [{'name': 'unit_number', 'type': 'string'},
    {'name': 'tenant_name', 'type': 'string'}]
);

menu.addItem('Evict tenant',
  function(tenant_name) {
    var tenant = findPerson(tenant_name);
    if (tenant !== null){ 
      for (var i = 0; i < building.units.length; i++){
        if (building.units[i].tenant === tenant_name) {
          var unit = building.units[i];
          building.removeTenant(unit, tenant);
          console.log("We have evicted " + tenant_name + " from unit#" + building.units[i].number);
        }
      }
    } else {
          console.log("the person you requested is not a tenant");
    }
  },
    null,
    [{'name': 'tenant_name', 'type': 'string'}]
);

menu.addItem('Show total sqft rented', 
  function() {
      var total=0; //Set my variable to zero
      //Search the building.units array
      //If an element of that array unit.tenant is not empty
      //Then take the sqft of that unit and add it to total
      building.units.forEach(function(unit) {
        if (unit.tenant !==null) { 
          total += unit.sqft; 
        }
      });
      console.log("You've rented out a total sqft of: "+ total);

    });

menu.addItem('Show total yearly income',
  function() {
  var total = 0;
  for(var i = building.units.length - 1; i >= 0; i--) {
        if (building.units[i].tenant !== null){
        total += building.units[i].rent;
        
          }
        }
        console.log(" rent: $" + total);
       }
);

menu.addItem('(Add your own feature ...)', 
  function() {
      console.log("Implement a feature that you find is useful");
    } 
);

// *******************************
menu.addDelimiter('*', 40);

menu.start();