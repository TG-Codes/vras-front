import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const usePreventBack = (props) => {
  const {userData} = props
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    // Disable back button
    const handlePopState = (event) => {
      event.preventDefault();
      window.history.pushState(null, '', window.location.href);
      if (userData && userData.role==="admin"){
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
      // navigate('/dashboard', { replace: true });
    };

    // Push state immediately and set popstate event listener
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    // Cleanup function
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate,location]);
};

export default usePreventBack;
