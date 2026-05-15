import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from '../features/api/authApi';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '@/features/authSlice';

const Login = () => {
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [
    loginUser,
    {
      data: loginDataResponse,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const [
    registerUser,
    {
      data: registerDataResponse,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;

    if (type === 'signup') {
      setSignupData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setLoginData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const [error, setError] = useState('');

  const handleRegister = async (e, type) => {
    e.preventDefault();
    const inputData = type === 'signup' ? signupData : loginData;

    if (type === 'signup') {
      if (inputData.password !== inputData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }
    const action = type === 'signup' ? registerUser : loginUser;
    try {
      const res = await action(inputData).unwrap();
      dispatch(
        userLoggedIn({
          user: res.user,
        }),
      );

      navigate('/');
      toast.success(res.message, {
        duration: 4000,
      });
    } catch (error) {
      toast.error(error?.data?.message || 'An error occurred!');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Tabs defaultValue="signup" className="w-[400px] ">
        <Card
          className="rounded-2xl border 
bg-white dark:bg-gray-900 
border-gray-200 dark:border-gray-700 
shadow-lg dark:shadow-black/40"
        >
          <CardHeader className="pb-2  border-b">
            <TabsList
              className="grid grid-cols-2 w-full 
bg-gray-100 dark:bg-gray-800 
p-1 rounded-xl"
            >
              <TabsTrigger
                value="signup"
                className="rounded-lg 
text-gray-800 dark:text-gray-200
hover:bg-gray-100 dark:hover:bg-gray-700 
data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 
data-[state=active]:shadow-sm"
              >
                Sign-Up
              </TabsTrigger>
              <TabsTrigger
                value="login"
                className="rounded-lg 
text-gray-800 dark:text-gray-200
hover:bg-gray-100 dark:hover:bg-gray-700 
data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 
data-[state=active]:shadow-sm"
              >
                Login
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <TabsContent value="login" className="mt-0">
            <CardHeader>
              <CardTitle className="text-black dark:text-white">
                Login to your account
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <form onSubmit={(e) => handleRegister(e, 'login')}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="email"
                      className="text-gray-800 dark:text-gray-300"
                    >
                      Email
                    </Label>
                    <Input
                      className="bg-white dark:bg-gray-800 text-black dark:text-white
border border-gray-300 dark:border-gray-600
  placeholder-gray-500 dark:placeholder-gray-400
  focus:ring-2 focus:ring-blue-500
  "
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={(e) => changeInputHandler(e, 'login')}
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex justify-between items-center">
                      <Label
                        htmlFor="password"
                        className="text-gray-800 dark:text-gray-300"
                      >
                        Password
                      </Label>
                      <a
                        href="#"
                        className="
  text-black dark:text-white
  placeholder-gray-500 dark:placeholder-gray-400
  "
                      >
                        {' '}
                        Forgot your password?{' '}
                      </a>
                    </div>
                    <Input
                      className="
  bg-white dark:bg-gray-800
  text-black dark:text-white
  border border-gray-300 dark:border-gray-600
  placeholder-gray-500 dark:placeholder-gray-400
  focus:ring-2 focus:ring-blue-500
  "
                      name="password"
                      value={loginData.password}
                      type="password"
                      onChange={(e) => changeInputHandler(e, 'login')}
                      required
                    />
                  </div>
                </div>
                <CardFooter className="flex-col gap-2">
                  <Button
                    disabled={loginIsLoading}
                    type="submit"
                    className="
w-full text-base font-semibold 
border-gray-300 dark:border-gray-600
text-gray-800 dark:text-gray-200
hover:bg-gray-100 dark:hover:bg-gray-800
"
                  >
                    {loginIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="
w-full text-base font-semibold 
border-gray-300 dark:border-gray-600
text-gray-800 dark:text-gray-200
hover:bg-gray-100 dark:hover:bg-gray-800
"
                  >
                    Login with Google
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </TabsContent>
          <TabsContent value="signup" className="mt-0">
            <CardHeader>
              <CardTitle className="text-black dark:text-white">
                Create an account
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Enter your details below to create your account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              {error && (
                <div
                  className="p-3 text-sm 
text-red-600 dark:text-red-400 
bg-red-100 dark:bg-red-900/30 
rounded"
                >
                  {error}
                </div>
              )}

              <form onSubmit={(e) => handleRegister(e, 'signup')}>
                <div className="flex flex-col gap-6">
                  {/* Full Name */}
                  <div className="grid gap-2">
                    <Label
                      htmlFor="name"
                      className="text-gray-800 dark:text-gray-300"
                    >
                      Full Name
                    </Label>
                    <Input
                      className="
  bg-white dark:bg-gray-800
  text-black dark:text-white
  border border-gray-300 dark:border-gray-600
  placeholder-gray-500 dark:placeholder-gray-400
  focus:ring-2 focus:ring-blue-500
  "
                      name="name"
                      value={signupData.name}
                      onChange={(e) => changeInputHandler(e, 'signup')}
                      type="text"
                      placeholder="Eg. John Doe"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="grid gap-2">
                    <Label
                      htmlFor="signup-email"
                      className="text-gray-800 dark:text-gray-300"
                    >
                      Email
                    </Label>
                    <Input
                      className="
  bg-white dark:bg-gray-800
  text-black dark:text-white
  border border-gray-300 dark:border-gray-600
  placeholder-gray-500 dark:placeholder-gray-400
  focus:ring-2 focus:ring-blue-500
  "
                      name="email"
                      value={signupData.email}
                      onChange={(e) => changeInputHandler(e, 'signup')}
                      id="signup-email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="grid gap-2">
                    <Label
                      htmlFor="signup-password"
                      className="text-gray-800 dark:text-gray-300"
                    >
                      Password
                    </Label>
                    <Input
                      className="
  bg-white dark:bg-gray-800
  text-black dark:text-white
  border border-gray-300 dark:border-gray-600
  placeholder-gray-500 dark:placeholder-gray-400
  focus:ring-2 focus:ring-blue-500
  "
                      name="password"
                      value={signupData.password}
                      onChange={(e) => changeInputHandler(e, 'signup')}
                      id="signup-password"
                      type="password"
                      required
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="grid gap-2">
                    <Label
                      htmlFor="confirm-password"
                      className="text-gray-800 dark:text-gray-300"
                    >
                      Confirm Password
                    </Label>
                    <Input
                      className="
  bg-white dark:bg-gray-800
  text-black dark:text-white
  border border-gray-300 dark:border-gray-600
  placeholder-gray-500 dark:placeholder-gray-400
  focus:ring-2 focus:ring-blue-500
  "
                      name="confirmPassword"
                      value={signupData.confirmPassword}
                      onChange={(e) => changeInputHandler(e, 'signup')}
                      id="confirm-password"
                      type="password"
                      required
                    />
                  </div>
                </div>
                <CardFooter className="flex-col gap-2">
                  <Button
                    disabled={registerIsLoading}
                    type="submit"
                    className="
w-full text-base font-semibold 
border-gray-300 dark:border-gray-600
text-gray-800 dark:text-gray-200
hover:bg-gray-100 dark:hover:bg-gray-800
"
                  >
                    {registerIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing up...
                      </>
                    ) : (
                      'SignUp'
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="
w-full text-base font-semibold 
border-gray-300 dark:border-gray-600
text-gray-800 dark:text-gray-200
hover:bg-gray-100 dark:hover:bg-gray-800
"
                  >
                    Sign Up with Google
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
};
export default Login;
