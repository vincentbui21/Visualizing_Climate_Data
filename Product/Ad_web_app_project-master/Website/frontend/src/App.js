import './App.css';
import {Provider} from "react-redux";
import UserProfilePage from './components/screens/MainPage/UserProfilePage';
import DisplayCharts from "./components/screens/MainPage/DisplayCharts";
import SecondPage from "./components/screens/MainPage/SecondPage";
import store from './store/store';
import Header from "./components/screens/UI components/Header";
import Navbar from "./components/screens/UI components/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { LayoutForDesignPageProvider } from './context/LayoutForDesignPage';
import LayoutDesignForUser from './components/screens/MainPage/LayoutDesignForUser';
import ProtectedScreen from './components/screens/ProtectScreen/ProtectedScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './components/screens/MainPage/LogIn';
import { TotalChartsProvider } from './context/LayoutContext';
import Register from './components/screens/MainPage/Register';
import LineChartOfV2 from './components/AllChartDesigns/LineChartOfV2';
import LineChartOfV3 from './components/AllChartDesigns/LineChartOfV3';
import LineChartOfV4 from './components/AllChartDesigns/LineChartOfV4';
import LineChartOfV5 from './components/AllChartDesigns/LineChartOfV5';
import LineChartOfV6 from './components/AllChartDesigns/LineChartOfV6';
import LineChartOfV7 from './components/AllChartDesigns/LineChartOfV7';
import LineChartOfV8 from './components/AllChartDesigns/LineChartOfV8';
import DoughnutChartOfV9 from './components/AllChartDesigns/DoughnutChartOfV9';
import { LineChartProvider } from './context/LineChartContext';
import PublicLayout from './components/screens/MainPage/PublicLayout';

let arrayScreen = [];
arrayScreen.push({id: "v2", item: <LineChartOfV2 />});
arrayScreen.push({id: "v3", item: <LineChartOfV3 />});
arrayScreen.push({id: "v4", item: <LineChartOfV4 />});
arrayScreen.push({id: "v5", item: <LineChartOfV5 />});
arrayScreen.push({id: "v6", item: <LineChartOfV6 />});
arrayScreen.push({id: "v7", item: <LineChartOfV7 />});
arrayScreen.push({id: "v8", item: <LineChartOfV8 />});
arrayScreen.push({id: "v9", item: <DoughnutChartOfV9 />});


function App() {


  let [navbarIsOpen, setNavbarIsOpen] = useState(false);
  
  const openModal = () => {
    setNavbarIsOpen(true);
  };

  const closeModal = () => {
    setNavbarIsOpen(false);
  };



  return (
    <>
    <Provider store={store}>
    <LineChartProvider>
      <TotalChartsProvider>
        <LayoutForDesignPageProvider>
      <Router>
      <Header openModal={openModal} />
      <Navbar closeModal={closeModal} navbarOpen={navbarIsOpen}/>

      <div className="">
      <Routes>

          {/* Main page for Athmospheric co2 and temperatures charts */}
          <Route exact path="/" element={
          <DisplayCharts arrayScreen={arrayScreen}/>
          }/>
          
          {/* Log in page */}
          <Route path="/login" element={<LogIn />}/>

          {/* Register page */}
          <Route path="/register" element={<Register />}/>

          {/* Page for user */}
          <Route path="/userprofile" element={<ProtectedScreen />}>
          <Route path="/userprofile" element={<UserProfilePage />}/>
          </Route>

          {/* Page for users to design layouts (must log in successfully) */}
          <Route path="/layoutdesign" element={<ProtectedScreen />}>
            <Route path="/layoutdesign" element={<LayoutDesignForUser />}/>
          </Route>

          {/* Page for emission sources charts */}
          <Route path ="/emission" element={<SecondPage />}/>

           {/* Page for public layout */}
           <Route path="/publiclayout/:idForLink" element={<PublicLayout />}/>
      </Routes>
      </div>

      {/* {arrayScreen.map((item) => (
          <SingleChart key={item.id} id={item.id} item={item.item}/>
      ))}  */}
      </Router>

      <ToastContainer />
      </LayoutForDesignPageProvider>
      </TotalChartsProvider>
    </LineChartProvider>
    </Provider>
    </>
  );
}

export default App;
