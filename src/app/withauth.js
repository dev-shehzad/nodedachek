// withAuth.js
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebaseConfig'; // Import your Firebase auth instance

const withAuth = (Component) => {
  const Auth = (props) => {
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          // If user is not authenticated, redirect to sign-in page
          router.push('/signin');
        }
      });

      return () => unsubscribe();
    }, []);

    return <Component {...props} />;
  };

  // Add server-side redirect if needed
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
