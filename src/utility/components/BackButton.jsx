import React from 'react'
import { useNavigate } from 'react-router-dom';

const BackButton = ({className, to=-1}) => {
    const navigate = useNavigate();
    const handleBack = (to) => {
            navigate(to); 
        };
  return (
    <div className={className} onClick={()=>handleBack(to)} style={{cursor: 'pointer'}}>
      <i className="fa fa-arrow-left"></i> 
    </div>
  )
}

export default BackButton
