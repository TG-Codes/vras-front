import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentPosition } from '../actions/allActions';


const RoleSwitchHandler = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith('/instructor')) {
      dispatch(setCurrentPosition('instructor'));
    } else if (path.startsWith('/user')) {
      dispatch(setCurrentPosition('user'));
    } else if (path.startsWith('/')) {
      dispatch(setCurrentPosition('client'));
    }
  }, [location, dispatch]);

  return null;
};

export default RoleSwitchHandler;
