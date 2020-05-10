export const addShape = ({
  sideOne = "",
  sideTwo = "",
  sideThree = "",
  sideFour = "",
} = {}) => ({
  type: "ADD_SHAPE",
  shape: {
    sideOne,
    sideTwo,
    sideThree,
    sideFour,
  },
});

export const resetShapes = () => ({
  type: "RESET_SHAPES",
});
