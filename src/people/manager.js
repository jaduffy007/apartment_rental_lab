var Person = require("./person");
var Building = require("../rental_property/building");

function Manager(name, contact) {
  // inherit name and contact
  Person.call(this,name,contact);
  // manager manages an 'array' of buildings
  this.buildings = [];

}
Manager.prototype = new Person();
// Set prototype and constructor
Manager.prototype.constructor = Manager;

Manager.prototype.addBuilding = function(building) {
  // check if building is an INSTANCEOF a Building
 if (building instanceof Building){
    this.buildings.push(building);
 }
  return this;
};

Manager.prototype.removeBuilding = function(building) {
  // remove building
  if (this.buildings.indexOf(building) >= 0);
   this.buildings.splice(this.buildings.indexOf(building),1);
   return this;
};

module.exports = Manager;