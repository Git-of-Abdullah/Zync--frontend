import './App.css'
import { Route, Routes } from 'react-router-dom'
import { AuthLayout } from './components/authLayout/AuthLayout'
import { SignUp } from './components/SignUpForm/Signup'
import { Login } from './components/LoginFrom/Login'
import { ForgotPassword } from './components/ForgotPassword/ForgotPassword'
import { ResetPassword } from './components/ResetPassword/ResetPassword'
import { HomeLayout } from './components/HomeLayout/HomeLayout'
import { Feed } from './components/Feed/Feed'
import { Create } from './components/Create/Create'
import { Profile } from './components/Profile/Profile'
import { ThemeContext } from './components/ThemeContext/ThemeContext'
import ChatPage from './components/ChatPage/ChatPage'
import { Settings } from './components/Settings/Settings'
import { Post } from './components/Post/Post'

function App({user}) {
  

  return (
    <>
      {/* {console.log(user)} */}
       <Routes>
      <Route path='/auth' element= {<AuthLayout/>}>
            <Route index element= {<SignUp/>}></Route>
            <Route path='login' element={<Login/>}></Route>
            <Route path='forgotPassword' element={<ForgotPassword/>}></Route>
          {/*-----------------------Reset password route------------------- */}
            <Route path='resetPassword/:token' element={<ResetPassword/>}></Route>      
      </Route>
      <Route path='/home' element={<HomeLayout user = {user}/>}>
        <Route index element= {<Feed currentUser = {user}/>}></Route>
      </Route>
      {/*Create Page*/}
      <Route path='/create' element={<HomeLayout user = {user} />}>
        <Route index element= {<Create/>}></Route>
      </Route>
      <Route path='/profile/:id' element={<Profile/>}>
      </Route>
      <Route path='/inbox' element={<ChatPage/>}></Route>
      <Route path='/settings' element={<HomeLayout user = {user}></HomeLayout>}>
        <Route index element={<Settings user={user}/>}/>
      </Route>
      <Route path='/post/:id' element={<HomeLayout user={user}></HomeLayout>}>
        <Route index element={<Feed currentUser={user}></Feed>}></Route>
      </Route>
    </Routes>
    </>
  )
}

export default App
