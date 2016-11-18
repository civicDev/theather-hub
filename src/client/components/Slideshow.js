import React from "react";

const Slideshow = () => {

  const slideshowStyle = {
    backgroundImage : "url(../img/slide.png)"
  };

  return (
    <div className="slideshow" style={slideshowStyle} >
        <div className="slideinfo">
            <div className="title">
                Păhărelul cu nectar
            </div>
            <div className="location">
                Teatrul Elisabeta, București
            </div>
            <div className="date">
                Sâmbătă, 12 Noiembrie, ora 11
            </div>
        </div>
    </div>
  );
};

export default Slideshow;
