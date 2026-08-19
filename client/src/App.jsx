import { Routes, Route } from 'react-router-dom'
import Test from './pages/Test'

import Register from './pages/auth/Register.jsx'
import Login from './pages/auth/Login.jsx'
import Home from './pages/home/Home.jsx'
import Groups from './pages/groups/Groups.jsx'
import CreateGroup from './pages/groups/CreateGroup.jsx'
import JoinGroup from './pages/groups/JoinGroup.jsx'

import Events from './pages/events/Events.jsx'
import CreateEvent from './pages/events/CreateEvent.jsx'
import EventResponses from './pages/events/EventResponses.jsx'

import Profile from './pages/profile/Profile.jsx'

import ProtectedRoute from './components/ProtectedRoute.jsx'
import ProtectedLayout from './components/ProtectedLayout.jsx'
import PendingRequests from './pages/groups/PendingRequests.jsx'
import GroupMembers from './pages/groups/GroupMembers.jsx'

const App = () => {
  return (
    <Routes>

      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Authenticated */}
      <Route element={<ProtectedRoute />}>
        <Route element={<ProtectedLayout />}>

          <Route path="/" element={<Home />} />

          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/create" element={<CreateGroup />} />
          <Route path="/groups/join" element={<JoinGroup />} />
          <Route path="/groups/:id/members" element={<GroupMembers />} />
          <Route path='/groups/:id/pending-requests' element={<PendingRequests />} />

          <Route path="/events" element={<Events />} />
          <Route path="/groups/:id/events/:eventId/responses" element={<EventResponses />} />
          <Route path="/create-event" element={<CreateEvent />} />


          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

    </Routes>

  )
}

export default App
