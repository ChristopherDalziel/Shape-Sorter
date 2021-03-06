import React from "react";
import styled from "@emotion/styled";
import { connect } from "react-redux";
import {
  sortByTriangles,
  sortByCircles,
  sortByQuadrilaterals,
} from "../actions/filters";

const FormContainer = styled.div`
  padding: 0px 10px 0px 10px;
  color: black;
  @media (max-width: 815px) {
    width: 50vw;
  }
`;

const Instructions = styled.p`
  width: 50vw;
`;

export class ShapeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideOne: props.shape ? props.shape.sideOne : "",
      sideTwo: props.shape ? props.shape.sideTwo : "",
      sideThree: props.shape ? props.shape.sideThree : "",
      sideFour: props.shape ? props.shape.sideFour : "",
      error: "",
    };
  }

  onSideOneChange = (e) => {
    const sideOne = e.target.value;
    if (!sideOne || sideOne.match(/^[1-9][0-9]*(\.\d{0,2})?$/)) {
      this.setState(() => {
        return { sideOne };
      });
    }
  };

  onSideTwoChange = (e) => {
    const sideTwo = e.target.value;
    if (!sideTwo || sideTwo.match(/^[1-9][0-9]*(\.\d{0,2})?$/)) {
      this.setState(() => {
        return { sideTwo };
      });
    }
  };

  onSideThreeChange = (e) => {
    const sideThree = e.target.value;
    if (!sideThree || sideThree.match(/^[1-9][0-9]*(\.\d{0,2})?$/)) {
      this.setState(() => {
        return { sideThree };
      });
    }
  };

  onSideFourChange = (e) => {
    const sideFour = e.target.value;

    if (!sideFour || sideFour.match(/^[1-9][0-9]*(\.\d{0,2})?$/)) {
      this.setState(() => {
        return { sideFour };
      });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.sideOne) {
      this.setState(() => ({
        error: "Please provide at least 'Side One' ",
      }));
    } else if (
      this.state.sideOne &&
      this.state.sideTwo &&
      !this.state.sideThree
    ) {
      this.setState(() => ({
        error: "Please provide a shape with more or less than 2 sides",
      }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        sideOne: this.state.sideOne,
        sideTwo: this.state.sideTwo,
        sideThree: this.state.sideThree,
        sideFour: this.state.sideFour,
      });

      if (
        this.state.sideOne &&
        this.state.sideTwo &&
        this.state.sideThree &&
        this.state.sideFour
      ) {
        this.props.sortByQuadrilaterals();
      } else if (
        this.state.sideOne &&
        this.state.sideTwo &&
        this.state.sideThree
      ) {
        this.props.sortByTriangles();
      } else if (this.state.sideOne) {
        this.props.sortByCircles();
      }
    }
  };

  render() {
    return (
      <FormContainer>
        <Instructions>
          Please enter your the lengths of each shape of the shape within the
          fields below, consider the lengths are been measured in pixels so you
          may want to use double digits to ensure your shape is visible!
          <Instructions>
            Then I will return your shape below, sorted into it's category!
          </Instructions>
        </Instructions>
        <form onSubmit={this.onSubmit}>
          {this.state.error && <p>{this.state.error}</p>}
          <label for="sideOne">Side One:</label>
          <input
            id="sideOne"
            autoFocus
            onChange={this.onSideOneChange}
            value={this.state.sideOne}
            placeholder="Side One"
          ></input>
          <label for="sideTwo">Side Two:</label>
          <input
            id="sideTwo"
            disabled={!this.state.sideOne ? true : false}
            onChange={this.onSideTwoChange}
            value={this.state.sideTwo}
            placeholder="Side Two"
          ></input>
          <label for="sideThree">Side Three:</label>
          <input
            id="sideThree"
            disabled={!this.state.sideTwo ? true : false}
            onChange={this.onSideThreeChange}
            value={this.state.sideThree}
            placeholder="Side Three"
          ></input>
          <label for="sideFour">Side Four:</label>
          <input
            id="sideFour"
            disabled={!this.state.sideThree ? true : false}
            onChange={this.onSideFourChange}
            value={this.state.sideFour}
            placeholder="Side Four"
          ></input>
          <button role="button">Create new shape</button>
        </form>
      </FormContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sortByTriangles: () => dispatch(sortByTriangles()),
    sortByCircles: () => dispatch(sortByCircles()),
    sortByQuadrilaterals: () => dispatch(sortByQuadrilaterals()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShapeForm);
