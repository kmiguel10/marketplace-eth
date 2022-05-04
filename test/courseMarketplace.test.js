const CourseMarketPlace = artifacts.require("CourseMarketplace");
//Internally truffle uses:
//Mocha - testing framework
//chai - assertion JS library

contract("CourseMarketplace", (accounts) => {
  let _contract = null;
  let contractOwner = null;
  let buyer = null;
  before(async () => {
    _contract = await CourseMarketPlace.deployed();
    contractOwner = accounts[0];
    buyer = accounts[1];

    console.log(_contract);
    console.log(contractOwner);
    console.log(buyer);
  });
  describe("Purchase the new course", () => {
    it("Should resolve into true value", () => {
      assert(true, "Value is not true");
    });
  });
});
