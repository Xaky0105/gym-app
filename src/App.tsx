import React from 'react'
import Layout from './components/layouts'
import { Route, Routes } from 'react-router-dom'
import CalendarPage from './pages/calendar-page'
import TrainingPage from './pages/training-page'

const App:React.FC = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/calendar' element={<CalendarPage />}/>
                <Route path='/training' element={<TrainingPage />}/>
            </Routes>
        </Layout>
    )
}

export default App