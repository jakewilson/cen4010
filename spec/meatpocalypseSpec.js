"use strict";
require("../src/client/js/meatpocalypse.js");
describe("Meatpocalypse", function() {
  it("is initializable", function() {
    var subject = new Meatpocalypse();
    expect(subject).toBeTruthy();
  });

  describe("Carrots", function(){
    var subject;
    beforeEach(function() {
      subject = new Meatpocalypse();
    });

    it("can get the number of carrots collected", function() {
      expect(subject.getCarrotsCollected()).toBe(0);
    });

    it("can register a collected carrot", function() {
      subject.registerCarrotCollected();
      expect(subject.getCarrotsCollected()).toBe(1);
      subject.registerCarrotCollected();
      expect(subject.getCarrotsCollected()).toBe(2);
    })
  });

  describe("Animals", function() {
    var subject;
    beforeEach(function() {
      subject = new Meatpocalypse();
    });

    it("can get the number of animals rescued", function() {
      expect(subject.getRescuedAnimals()).toBe(0);
    });

    it("can register an animal rescue", function() {
      subject.registerAnimalRescued();
      expect(subject.getRescuedAnimals()).toBe(1);
    });
  });

  describe("Score", function() {
    var subject;
    beforeEach(function() {
      subject = new Meatpocalypse(10, 100);
    });

    it("can register the final score", function() {
      subject.registerCarrotCollected();
      subject.registerCarrotCollected();
      subject.registerAnimalRescued();

      expect(subject.getScore()).toBe(120);
    });
  });
});
