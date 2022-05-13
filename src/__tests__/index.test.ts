import index from "../index";

describe("duration", () => {
  describe("interface", () => {
    describe("index", () => {
      it("should define an interface", () => {
        expect(index).toMatchSnapshot();
      });
    });
  });
});
