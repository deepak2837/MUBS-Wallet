import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/login.page';
import NotFoundPage from './pages/404.page';
import BaseLayout from './pages/base.page';
import Vouchers from './pages/vouchers.page';
import Attandants from './pages/attandants.page';
import Transactions from './pages/transactions.page';
import Clients from './pages/clients.page';
import EditPage from './pages/edit.page';
import ProfilePage from './pages/profile.page';
import { Chat } from './pages/chat.page';
import ChangePassword from './pages/change.password';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="" element={<Navigate to="login" replace />} />
        <Route path='login' element={<LoginPage/>}/>
        <Route path='changePassword' element={<ChangePassword/>}/>
        <Route element={<BaseLayout/>}>
          <Route path='vouchers' element={<Vouchers/>}/>
          <Route path='clients' element={<Clients/>}/>
          <Route path='transactions' element={<Transactions/>}/>
          <Route path='chats' element={<Chat/>}/>
          <Route path='attendants' element={<Attandants/>}/>
          <Route path=':path/:id' element={<EditPage/>}/>
          <Route path=':path/add' element={<EditPage/>}/>
          <Route path='profile' element={<ProfilePage/>}/>
        </Route>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
