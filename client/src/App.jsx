import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import StudentHeroSection from './pages/students/StudentHeroSection';
import MainLayout from './layout/MainLayout';
import Courses from './pages/students/Courses';
import CourseCard from './components/CourseCard';
import CourseDetails from './pages/students/CourseDetails';
import DashboardLayout from './layout/DashboardLayout';
import Profile from './pages/dashboard/Profile';
import Notifications from './pages/dashboard/Notifications';
import MyCourses from './pages/students/MyCourses';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import Sidebar from './pages/admin/Sidebar';
import Dashboard from './pages/admin/AdminDashboard';
import CourseTable from './pages/admin/course/CourseTable';
import AddCourse from './pages/admin/course/AddCourse';
import EditCourse from './pages/admin/course/EditCourse';
import LectureTable from './pages/admin/lecture/LectureTable';
import AddLecture from './pages/admin/lecture/AddLecture';
import EditLecture from './pages/admin/lecture/EditLecture';
import LearningPage from './pages/students/LearningPage';
import About from './pages/About';
import Contact from './pages/Contact';
import LeadTable from './pages/admin/leads/LeadTable';
import TrustStats from './components/home/TrustStats';
import WhyChooseUs from './components/home/ChooseUs';
import Testimonials from './components/home/Testimonials';
import FAQ from './components/home/FAQ';
import FeaturedCourses from './components/home/FeaturedCourses';
import AdminLogin from './pages/admin/AdminLogin';
import Payments from './pages/admin/Payments';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: (
      <div className="text-center mt-20 text-xl">Page Not Found 🚫</div>
    ),
    children: [
      {
        index: true,
        element: (
          <>
            <StudentHeroSection />
            <TrustStats />
            <FeaturedCourses />
            <WhyChooseUs />
            <Testimonials />
            <FAQ />
          </>
        ),
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'admin-login',
        element: <AdminLogin />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'courses',
        element: <Courses />,
      },
      {
        path: 'courses/:id',
        element: <CourseDetails />,
      },
      {
        path: 'learn/:courseId',
        element: (
          <ProtectedRoute>
            <LearningPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Profile /> },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'my-courses',
            element: <MyCourses />,
          },
          {
            path: 'notifications',
            element: <Notifications />,
          },
        ],
      },
      {
        path: 'admin',
        element: (
          <AdminProtectedRoute>
            <Sidebar />
          </AdminProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'leads',
            element: <LeadTable />,
          },
          {
            path: 'course',
            element: <CourseTable />,
          },
          {
            path: 'course/create',
            element: <AddCourse />,
          },
          {
            path: 'course/:courseId/lectures/create',
            element: <AddLecture />,
          },
          {
            path: 'course/:courseId/lectures/:lectureId',
            element: <EditLecture />,
          },
          {
            path: 'course/:courseId/lectures',
            element: <LectureTable />,
          },
          {
            path: 'course/:courseId',
            element: <EditCourse />,
          },
          {
            path: 'payments',
            element: <Payments />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
