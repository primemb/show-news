import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NewsCardFooter.module.css";

interface INewsCardFooter {
  isLiked: boolean;
  id: string;
  onLikeClick: (event: React.MouseEvent<SVGSVGElement>) => void;
}

const NewsCardFooter = (props: INewsCardFooter) => {
  const { isLiked, id, onLikeClick } = props;
  return (
    <div className="d-flex justify-content-between align-items-center">
      <FontAwesomeIcon
        onClick={onLikeClick}
        style={{ color: isLiked ? "red" : "#c2c1c1", cursor: "pointer" }}
        icon={faHeart}
      />
      <NavLink className={classes.text} to={`/${id}`}>
        ادامه مطلب
      </NavLink>
    </div>
  );
};

export default NewsCardFooter;
