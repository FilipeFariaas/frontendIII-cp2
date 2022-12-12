import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from "./Components/Navbar";
import Home from "./Routes/Home";
import Footer from "./Components/Footer";
import "./index.css";
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import App from "./App";
// import * as path from "path";
import Login from "./Routes/Login";
// import Data from "bootstrap/js/src/dom/data";
import Detail from "./Routes/Detail";
import {ThemeProvider} from "./hooks/useTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));
const appRouter = createBrowserRouter([
    {
        path: '',
        element: <App />,
        children: [
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'detail',
                element: <Detail />
            },
            {
                path: 'dentist/:id',
                element: <Detail />
            },
            {
                path: '',
                loader: () => redirect('/home')
            }
        ]
    }
])

//Lembre-se de configurar suas rotas e seu contexto aqui
root.render(
    <React.StrictMode>
        {/*<Navbar />*/}
        {/*<Home />*/}
        {/*<Footer />*/}
        <ThemeProvider>
            <RouterProvider router={appRouter} />
        </ThemeProvider>
    </React.StrictMode>
);
