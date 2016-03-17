Meatpocalypse = (function(carrotOverride, animalOverride) {
  "use strict";
  // private scope
  var carrotsCollected = 0,
    animalsRescued = 0,
    carrotMultiplier = carrotOverride || 100,
    animalMultiplier = animalOverride || 1000;

  // public scope
  return {
    getCarrotsCollected: function() {
      return carrotsCollected;
    },

    getRescuedAnimals: function() {
      return animalsRescued;
    },

    registerCarrotCollected: function() {
      carrotsCollected++;
    },

    registerAnimalRescued: function() {
      animalsRescued++;
    },

    getScore: function() {
      return (carrotsCollected * carrotMultiplier) +
        (animalsRescued * animalMultiplier);
    },
  };
});
