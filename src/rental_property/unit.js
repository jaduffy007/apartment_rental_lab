function Unit (number, building, sqft, rent) {
  // set params above as instance variables
    this.number = number;
    this.building = building;
    this.sqft = sqft;
    this.rent = rent;
  
   // Unit has also a tenant
   this.tenant = null;
  
}

Unit.prototype.available = function(){
  // Returns true if unit is available, otherwise false
  if (this.tenant === null){
    return true;
  }else{
    return false;
  }
};

// export the module
module.exports = Unit;

