import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { UserContext } from '../(root)/context/user.context';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
const ProtectedRoute = ({ children }) => {
  const [authenticated] = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!authenticated?.user?.username) {
      toast.success("Please Login before Proceeding")
      router.push('/login');
    }
  }, [authenticated, router]);

  return authenticated?.user?.username ? children : null;
};

export default ProtectedRoute;
