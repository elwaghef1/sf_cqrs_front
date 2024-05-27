import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import PostDetail from './components/PostDetail';
import Register from './components/Register';
import Login from './components/Login';
import UpdatePost from './components/UpdatePost';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PostList />
  },
  {
    path: '/create',
    element: <CreatePost />
  },
  {
    path: '/post/:id',
    element: <PostDetail />
  }, 
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  ,
  {
    path: 'post/update/:id',  // Add UpdatePost route
    element: <UpdatePost />
  }

])
function App() {
  return (
    <RouterProvider  router={router} />
  );
}

export default App;
