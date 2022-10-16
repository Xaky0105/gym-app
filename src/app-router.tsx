import { Routes, Route } from "react-router-dom"
import { privateRouteArr, publicRoutesArr } from "./routes"
import { PrivateRoute } from "./compound/privateRoute"
import { Layout } from "./components/layouts"

export const AppRouter = () => {
    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route element={<Layout />}>
                    {privateRouteArr.map(({Component, path}) => (
                        <Route key={path} path={path} element={<Component />}/>
                    ))}
                </Route>
            </Route>
            {publicRoutesArr.map(({Component, path}) => (
                <Route key={path} path={path} element={<Component />}/>
            ))}
        </Routes> 
    )
}