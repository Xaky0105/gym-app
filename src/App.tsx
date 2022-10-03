import React from 'react'
import Layout from './components/layouts'
import { Route, Routes } from 'react-router-dom'
import CalendarPage from './pages/calendar-page'
import AnalyticsPage from './pages/analytics-page'
import WorkoutsPage from './pages/workouts-page'
import CreateWorkoutPage from './pages/create-workout-page'
import { ROUTE_PATH } from './types/route'

const App:React.FC = () => {
    return (
        <Layout>
            <Routes>
                <Route path={ROUTE_PATH.CALENDAR} element={<CalendarPage />}/>
                <Route path={ROUTE_PATH.WORKOUT} element={<WorkoutsPage />}/>
                <Route path={ROUTE_PATH.ANALYTICS} element={<AnalyticsPage />}/>
                <Route path={ROUTE_PATH.CREATE_WORKOUT} element={<CreateWorkoutPage />}/>
                <Route path={ROUTE_PATH.EDIT_WORKOUT} element={<CreateWorkoutPage />}/>
            </Routes>
        </Layout>
    )
}

export default App