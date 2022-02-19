import React from 'react';

const ProductBreakDown = ({ characteristics })=>{
  const sizeChart = {
    'Size': {
      'sm': 'Too small',
      'mid': 'Perfect',
      'lg': 'Too wide'
    },
    'Width': {
      'sm': 'Too narrow',
      'mid': 'Perfect',
      'lg': 'Too wide'
    },
    'Comfort': {
      'sm': 'Poor',
      'mid': 'Ok',
      'lg': 'Perfect'
    },
    'Quality': {
      'sm': 'Poor',
      'mid': 'Expected',
      'lg': 'Perfect'
    },
    'Length': {
      'sm': 'Too short',
      'mid': 'Perfect',
      'lg': 'Too long'
    },
    'Fit': {
      'sm': 'Too tight',
      'mid': 'Perfect',
      'lg': 'Too long'
    }

  };
  const calProductVal = function (val) {
    let position = Math.floor((Number(val) / 5) * 94);
    position = position.toString() + '%';
    return position;
  };
  const generateRange = function (val) {

  };
  return (
    <div className='review-product'>

      {characteristics ? Object.keys(characteristics).map((key, index) => {
        //create a new key
        // console.log('char key', key);
        // console.log('char at fit', characteristics[key]);
        // console.log('fit value', characteristics[key].value);
        // console.log('size chart at key', sizeChart[key]);
        // console.log('parsed key size chart', sizeChart[JSON.parse(key)]);
        var parsedKey = JSON.parse(key);
        return (
          <div key={index}>
            <span style={{fontSize: '16px', fontWeight: '900', color: 'black'}}>{key}</span>
            <div className='review-productTrack'>
              <span className='review-productTrack-bar'></span> <span className='review-productTrack-bar'></span> <span className='review-productTrack-bar'></span>
              <span className='review-productTrack-text' id='review-productTrack-text-1'>{sizeChart[parsedKey]['sm']}</span>
              <span className='review-productTrack-text' id='review-productTrack-text-2'>{sizeChart[parsedKey]['mid']}</span>
              <span className='review-productTrack-text' id='review-productTrack-text-3'>{sizeChart[parsedKey]['lg']}</span>
              <i data-testid="review-leftCorner-triangle" className='fas fa-caret-down' style={{left: calProductVal(characteristics[key]['value'])}}></i>
            </div>
          </div>
        );
      }) : null}
    </div>
  );
};

export default ProductBreakDown;