import React from "react";
import { connect } from "react-redux";
const pVariant = {
  "default": {
    fontSize: 20,
  },
  "small": {
    fontSize: 16,
  },
  "small-plus":{
    fontSize: 18
  },
  "medium": {
    fontSize: 24,
  },
  "medium-plus": {
    fontSize: 25,
  },
  "large": {
    fontSize: 26,
  },
};

/* responsive starts here */

 const pResponsive1280 = {
  "default": {
    fontSize: 18,
  },
  small: {
    fontSize: 16,
  },
  "small-plus":{
    fontSize: 18
  },
  medium: {
    fontSize: 24,
  },
  "medium-plus": {
    fontSize: 25,
  },
  large: {
    fontSize: 26,
  },
}

const pResponsive1440 = {
  "default": {
    fontSize: 18,
  },
  small: {
    fontSize: 16,
  },
  "small-plus":{
    fontSize: 18
  },
  medium: {
    fontSize: 24,
  },
  "medium-plus": {
    fontSize: 25,
  },
  large: {
    fontSize: 26,
  },
}

const pResponsive1366 = {
  "default": {
    fontSize: 18,
  },
  small: {
    fontSize: 16,
  },
  "small-plus":{
    fontSize: 18
  },
  medium: {
    fontSize: 24,
  },
  "medium-plus": {
    fontSize: 25,
  },
  large: {
    fontSize: 26,
  },
}

const pResponsive1199 = {
  "default": {
    fontSize: 18,
  },
  small: {
    fontSize: 16,
  },
  "small-plus":{
    fontSize: 18
  },
  medium: {
    fontSize: 20,
  },
  "medium-plus": {
    fontSize: 25,
  },
  large: {
    fontSize: 26,
  },
}
// this is for testing purpose and not implemented yet
const pResponsive991 = {
  "default": {
    fontSize: 16,
  },
  small: {
    fontSize: 16,
  },
  "small-plus":{
    fontSize: 18
  },
  medium: {
    fontSize: 20,
  },
  "medium-plus": {
    fontSize: 25,
  },
  large: {
    fontSize: 26,
  },
};

const pResponsive767 = {
  default: {
    fontSize: 16,
  },
  small: {
    fontSize: 16,
  },
  "small-plus":{
    fontSize: 16
  },
  medium: {
    fontSize: 16,
  },
  "medium-plus": {
    fontSize: 25,
  },
  large: {
    fontSize: 26,
  },
}

const pResponsive575 = {
  default: {
    fontSize: 16,
  },
  small: {
    fontSize: 16,
  },
  "small-plus":{
    fontSize: 16
  },
  medium: {
    fontSize: 16,
  },
  "medium-plus": {
    fontSize: 25,
  },
  large: {
    fontSize: 26,
  },
}

const pResponsive480 = {
  default: {
    fontSize: 16,
  },
  small: {
    fontSize: 16,
  },
  "small-plus":{
    fontSize: 16
  },
  medium: {
    fontSize: 16,
  },
  "medium-plus": {
    fontSize: 25,
  },
  large: {
    fontSize: 26,
  },
}
/* responsive ends here */
export const Paragraph = ({
  children,
  className,
  variant = "default",
  fontSize,
  ...props
}) => {
  let fontSizeCalc = `${pVariant[variant].fontSize + fontSize}px`;
  if (window.innerWidth <= 767) {
    fontSizeCalc = `${pResponsive767[variant].fontSize + fontSize}px`;
  }
  if (window.innerWidth <= 991 && window.innerWidth>767) {
    fontSizeCalc = `${pResponsive991[variant].fontSize + fontSize}px`;
  }
  if (window.innerWidth <= 1440 && window.innerWidth >991) {
    fontSizeCalc = `${pResponsive1280[variant].fontSize + fontSize}px`;
  }
  return (
    <p className={className} style={{ fontSize: fontSizeCalc }} {...props}>
      {children}
    </p>
  );
};

const mapStateToProps = (globalState) => {
  return {
    fontSize: globalState.mainReducerData.fontSize,
  };
};

export const P = connect(mapStateToProps)(Paragraph);





/* h1 tag below */


const hOneVariant={
  "default":{
      "fontSize":70
  }
}
const hResponsive1440 = {
"default":{
  "fontSize": 55
}
}
const hResponsive1199 = {
"default":{
  "fontSize": 45
}
}
const hResponsive991 = {
"default":{
  "fontSize": 35
}
}
const hResponsive480 = {
"default":{
  "fontSize": 24
}
}
export const Hone = ({ children, className, variant="default", fontSize, ...props }) => {
let fontSizeCalc = `${hOneVariant[variant].fontSize+fontSize}px`;
if (window.innerWidth<=1440 && window.innerWidth>1199){
  fontSizeCalc = `${hResponsive1440[variant].fontSize+fontSize}px`;
}
if (window.innerWidth<=1199 && window.innerWidth>991){
  fontSizeCalc = `${hResponsive1199[variant].fontSize+fontSize}px`;
}
if (window.innerWidth<=991 && window.innerWidth>480){
  fontSizeCalc = `${hResponsive991[variant].fontSize+fontSize}px`;
}
if (window.innerWidth<=480){
  fontSizeCalc = `${hResponsive480[variant].fontSize+fontSize}px`;
}
return (
  <h1 className={className} style={{fontSize:fontSizeCalc}} {...props}>
    {children}
  </h1>
)
}

export const HeaderOne = connect(mapStateToProps)(Hone);

/*h2 tag below*/

const hTwoVariant={
  "default":{
      "fontSize":40
    },
    "default-second":{
      "fontSize":40
    },
    "default-third":{
      "fontSize":40
    },
  "small":{
      "fontSize":24
    },
  "small-plus":{
    "fontSize":25
    },
  "medium":{
      "fontSize":30
    },
    "medium-plus":{
      "fontSize":38
    }
}
const hTwoResponsive1366={
  "default":{
      "fontSize":32
    },
    "default-second":{
      "fontSize":32
    },
    "default-third":{
      "fontSize":40
    },
  "small":{
      "fontSize":24
    },
  "small-plus":{
    "fontSize":25
    },
  "medium":{
      "fontSize":30
    },
    "medium-plus":{
      "fontSize":38
    }
}
const hTwoResponsive1199={
  "default":{
      "fontSize":35
    },
    "default-second":{
      "fontSize":32
    },
    "default-third":{
      "fontSize":30
    },
  "small":{
      "fontSize":24
    },
  "small-plus":{
    "fontSize":25
    },
  "medium":{
      "fontSize":30
    },
    "medium-plus":{
      "fontSize":38
    }
}
const hTwoResponsive991={
  "default":{
      "fontSize":26
    },
    "default-second":{
      "fontSize":32
    },
    "default-third":{
      "fontSize":30
    },
  "small":{
      "fontSize":24
    },
  "small-plus":{
    "fontSize":20
    },
  "medium":{
      "fontSize":22
    },
    "medium-plus":{
      "fontSize":38
    }
}
const hTwoResponsive767={
  "default":{
      "fontSize":26
    },
    "default-second":{
      "fontSize":32
    },
    "default-third":{
      "fontSize":40
    },
  "small":{
      "fontSize":24
    },
  "small-plus":{
    "fontSize":20
    },
  "medium":{
      "fontSize":22
    },
    "medium-plus":{
      "fontSize":38
    }
}
const hTwoResponsive565={
  "default":{
      "fontSize":26
    },
    "default-second":{
      "fontSize":26
    },
    "default-third":{
      "fontSize":22
    },
  "small":{
      "fontSize":24
    },
  "small-plus":{
    "fontSize":20
    },
  "medium":{
      "fontSize":22
    },
    "medium-plus":{
      "fontSize":38
    }
}
export const HTwo = ({ children, className, variant="default", fontSize, ...props }) => {
  let fontSizeCalc = `${hTwoVariant[variant].fontSize + fontSize}px`;
  if (window.innerWidth<=1366 && window.innerWidth>1280){
    fontSizeCalc = `${hTwoResponsive1366[variant].fontSize+fontSize}px`
  }
  if (window.innerWidth<=1280 && window.innerWidth>1199){
    fontSizeCalc = `${hTwoResponsive1366[variant].fontSize+fontSize}px`
  }
  if (window.innerWidth<=1199 && window.innerWidth>991){
    fontSizeCalc = `${hTwoResponsive1199[variant].fontSize+fontSize}px`
  }
  if (window.innerWidth<=991 && window.innerWidth>767){
    fontSizeCalc = `${hTwoResponsive991[variant].fontSize+fontSize}px`
  }
  if (window.innerWidth<=767 && window.innerWidth>565){
    fontSizeCalc = `${hTwoResponsive767[variant].fontSize+fontSize}px`
  }
  if (window.innerWidth<=767 && window.innerWidth>565){
    fontSizeCalc = `${hTwoResponsive767[variant].fontSize+fontSize}px`
  }
  if (window.innerWidth<=565){
    fontSizeCalc = `${hTwoResponsive565[variant].fontSize+fontSize}px`
  }
  return (
    <h2 className={className} style={{fontSize: fontSizeCalc}} {...props}>
      {children}
    </h2>
  );
};

export const HeaderTwo = connect(mapStateToProps)(HTwo);

/* h3 tag below */

const hThreeVariant={
  "default":{
      "fontSize":30
  },
  "small":{
      "fontSize":22
  },
  "large":{
      "fontSize":45
  }
}

const hThreeResponsive991={
  "default":{
      "fontSize":26
  },
  "small":{
      "fontSize":22
  },
  "large":{
      "fontSize":45
  }
}

const hThreeResponsive575={
  "default":{
      "fontSize":22
  },
  "small":{
      "fontSize":18
  },
  "large":{
      "fontSize":30
  }
}
export const HThree = ({ children, className, variant="default", fontSize, ...props }) => {
  let fontSizeCalc = `${hThreeVariant[variant].fontSize+fontSize}px`
  if (window.innerWidth<=991 && window.innerWidth>575){
    fontSizeCalc = `${hThreeResponsive991[variant].fontSize+fontSize}px`
  }
  if (window.innerWidth<=575){
    fontSizeCalc = `${hThreeResponsive575[variant].fontSize+fontSize}px`
  }
  return (
    <h3 className={className} style={{fontSize: fontSizeCalc}} {...props}>
      {children}
    </h3>
  );
};

export const HeaderThree = connect(mapStateToProps)(HThree);

const hFourVariant={
  "default":{
      "fontSize":24
  }
}
const hFourResponsive1280={
  "default":{
      "fontSize":18
  }
}
export const HFour = ({ children, className, variant="default", fontSize, ...props }) => {
  let fontSizeCalc = `${hFourVariant[variant].fontSize+fontSize}px`
  if (window.innerWidth<=1280){
    fontSizeCalc = `${hFourResponsive1280[variant].fontSize+fontSize}px`
  }
  return (
    <h4 className={className} style={{fontSize:fontSizeCalc}} {...props}>
      {children}
    </h4>
  );
};

export const HeaderFour = connect(mapStateToProps)(HFour);

/* h5 below */


const hFiveVariant={
  "default":{
      "fontSize":20
  },
 "large":{
      "fontSize":40
  }
}
const hFiveResponsive991={
  "default":{
      "fontSize":20
  },
 "large":{
      "fontSize":30
  }
}
const hFiveResponsive575={
  "default":{
      "fontSize":20
  },
 "large":{
      "fontSize":22
  }
}
export const HFive = ({ children, className, variant="default", fontSize, ...props }) => {
  let fontSizeCalc = `${hFiveVariant[variant].fontSize+fontSize}px`
  if (window.innerWidth<=991 && window.innerWidth>575){
    fontSizeCalc = `${hFiveResponsive991[variant].fontSize+fontSize}px`
  }
  if (window.innerWidth<=575){
    fontSizeCalc = `${hFiveResponsive575[variant].fontSize+fontSize}px`
  }
  return (
    <h5 className={className} style={{fontSize:fontSizeCalc}} {...props}>
      {children}
    </h5>
  );
};

export const HeaderFive = connect(mapStateToProps)(HFive);

const hSixVariant={
  "default":{
      "fontSize":24
  },
  "default-second":{
    "fontSize":24
  },
  "small":{
    "fontSize":20
},
"x-small":{
    "fontSize":16
},
 "large":{
      "fontSize":40
  }
}
const hSixResponsive1199={
  "default":{
      "fontSize":20
  },
  "default-second":{
    "fontSize":20
  },
  "small":{
    "fontSize":20
},
"x-small":{
    "fontSize":20
},
 "large":{
      "fontSize":40
  }
}
const hSixResponsive767={
  "default":{
      "fontSize":18
  },
  "default-second":{
    "fontSize":20
  },
  "small":{
    "fontSize":20
},
"x-small":{
    "fontSize":20
},
 "large":{
      "fontSize":40
  }
}
const hSixResponsive575={
  "default":{
      "fontSize":18
  },
  "default-second":{
    "fontSize":20
  },
  "small":{
    "fontSize":18
},
"x-small":{
    "fontSize":20
},
 "large":{
      "fontSize":40
  }
}
export const HSix = ({ children, className, variant="default", fontSize, ...props }) => {
  let fontSizeCalc = `${hSixVariant[variant].fontSize+fontSize}px`
  if (window.innerWidth<=1199 && window.innerWidth>767){
    fontSizeCalc = `${hSixResponsive1199[variant].fontSize+fontSize}px`
  }
  if (window.innerWidth<=767 && window.innerWidth>575){
    fontSizeCalc = `${hSixResponsive767[variant].fontSize+fontSize}px`
  }
  if (window.innerWidth<=575){
    fontSizeCalc = `${hSixResponsive575[variant].fontSize+fontSize}px`
  }
  return (
    <h6 className={className} style={{fontSize: fontSizeCalc}} {...props}>
      {children}
    </h6>
  );
};


export const HeaderSix = connect(mapStateToProps)(HSix);