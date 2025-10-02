import React, { useState, useEffect } from 'react';

const InnerHeader = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(date.toLocaleDateString(undefined, options));
  }, []);

  return (
    <div className="subheader">
      <div className="latest_update">
        <span><i className="fa-solid fa-circle-info"></i></span>
        <p>Check out latest updates.</p>
      </div>
      <div className='date_box'>
        {currentDate}
      </div>
    </div>
  );
}

export default InnerHeader;
