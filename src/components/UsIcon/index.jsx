import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cs from "classnames";
import styles from "./index.less";

const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
const req = require.context("assets/icon", false, /\.svg$/);
requireAll(req);

class Icon extends PureComponent {
  static defaultProps = {
    className: "",
  };

  render() {
    const { name, className } = this.props;
    return (
      <i className={cs(className, [styles["us-icon"]])}>
        <svg
          aria-hidden="true"
          width="1em"
          height="1em"
          fill="currentColor"
          className={styles.svg}
        >
          <use xlinkHref={`#icon-${name}`} />
        </svg>
      </i>
    );
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Icon;
