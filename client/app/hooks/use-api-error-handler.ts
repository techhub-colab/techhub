import { isAxiosError } from 'axios';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useAuth } from '~/contexts/auth';

const useApiErrorHandler = () => {
  const { clearAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleApiError = useCallback((err: unknown) => {
    if (!isAxiosError(err)) {
      console.error(err);
      toast.error('Unexpected error. Please try again later.');
      return;
    }

    const statusCode = err.response?.status;
    const errCode = err.response?.data.code;

    if (statusCode === 401) {
      // Failed refresh token
      clearAuth();
      navigate('/login', { state: { from: location } });
      toast.info('Session expired. Please log in again.');

    } else if (statusCode === 403 && errCode === 'INACTIVE_USER') {
      // sign out the user if it's marked as inactive or removed
      // when its session has not expired
      clearAuth();
      toast.error('Inactive user. Please contact the admin for more details.');
      navigate('/');

    } else {
      console.error(err);
      toast.error('Unexpected error. Please try again later.');
    }
  }, [clearAuth, location, navigate]);

  return handleApiError;
};

export default useApiErrorHandler;
