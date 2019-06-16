import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import "./transformations.css";
import transformationActions from "brain-of-isaac-commons/actions/transformationActions";
import ItemService from "brain-of-isaac-commons/services/ItemService";
import PillService from "brain-of-isaac-commons/services/PillService";
import Transformation from "brain-of-isaac-commons/components/Transformation";
import C from "brain-of-isaac-commons/constants/transformationConstants";
import { Spring } from "react-spring/renderprops";
import { animated } from "react-spring";
import TboiImage from "./TboiImage";

const SelectButton = (
  name,
  selected,
  imgSrc,
  transformationCount,
  transGone,
  label,
  clickHandler
) => {
  const cappedCount = transformationCount > 3 ? 3 : transformationCount;
  const className =
    `boi-trans-select boi-trans-select-${cappedCount}` +
    (selected === name ? " selected" : "");

  const imgClassName = transGone ? "boi-trans-gone" : "";
  return (
    <span
      key={name}
      className={className}
      title={`${label} ${transformationCount}/3`}
      onClick={clickHandler}
    >
      <TboiImage key={imgSrc} className={imgClassName} height={32} src={imgSrc} />
      <span className="boi-trans-select-count" />
    </span>
  );
};

class TransformationsPage extends Component {
  constructor(props) {
    super(props);
    this.selectClickHandler = this.selectClickHandler.bind(this);
    this.transformationCount = this.transformationCount.bind(this);
    this.isTransformationGone = this.isTransformationGone.bind(this);
    this.renderSelected = this.renderSelected.bind(this);
  }

  selectClickHandler(transformation) {
    return () => this.props.onSelectTransformation(transformation);
  }

  transformationCount(transformation) {
    if (
      !this.props.transformations ||
      !this.props.transformations[transformation]
    )
      return 0;
    return this.props.transformations[transformation].count || 0;
  }

  isTransformationGone(transformation){
    if (
      !this.props.transformations ||
      !this.props.transformations[transformation] ||
      !this.props.transformations[transformation].items
    )
      return false;

    const items = this.props.transformations[transformation].items;
    const count = this.props.transformations[transformation].count;
    const missingItemsId = Object.keys(items).filter(
      itemId => !items[itemId].got && !items[itemId].gone
    );
    return count + missingItemsId.length < 3;
  }

  renderSelected(selected) {
    const SelectedTransformation = Transformation[selected];
    return (
      <div className="boi-trans" key={selected}>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {props => (
            <animated.div style={props}>
              <SelectedTransformation
                {...this.props.transformations[selected]}
              />
            </animated.div>
          )}
        </Spring>
      </div>
    );
  }

  render() {
    const trans = this.props.transformations;
    const pillId = (trans && trans.adulthood && trans.adulthood.pillId) || "0";
    const selected = (trans && trans.selected) || "guppy";

    const select = (name, imgSrc) =>
      SelectButton(
        name,
        selected,
        imgSrc,
        this.transformationCount(name),
        this.isTransformationGone(name),
        C.labels[name],
        this.selectClickHandler(name)
      );
    const itemSelect = (name, id) => select(name, ItemService.imgSrc(id));
    const pillSelect = (name, id) => select(name, PillService.imgSrc(id));

    return (
      <div className="boi-trans-container">
        <div className="boi-trans-select-toolbar">
          {itemSelect("guppy", "145")}
          {itemSelect("beelzebub", "365")}
          {itemSelect("funguy", "11")}
          {itemSelect("seraphim", "112")}
          {itemSelect("bob", "42")}
          {itemSelect("spun", "345")}
          {itemSelect("mom", "217")}
          {itemSelect("conjoined", "167")}
          {itemSelect("leviathan", "51")}
          {itemSelect("ohcrap", "36")}
          {itemSelect("superbum", "144")}
          {itemSelect("bookworm", "287")}
          {pillSelect("adulthood", pillId)}
          {itemSelect("spiderbaby", "89")}
          {itemSelect("stompy", "302")}
        </div>
        {this.renderSelected(selected)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    transformations: state.transformations,
    selected: state.transformations && state.transformations.selected,
    pillId:
      (state.transformations &&
        state.transformations.adulthood &&
        state.transformations.adulthood.pillId) ||
      "0"
  };
};

const mapDispatchToProps = dispatch => ({
  onSelectTransformation: name => {
    dispatch(transformationActions.selectTransformation(name))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransformationsPage);
