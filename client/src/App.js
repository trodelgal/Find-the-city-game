import React from 'react';
import WrappedMap from './components/Map';
import './App.css';


function App() {
  return (
    <div className="App" style={{width: '100%', height: '100%'}}>
      <WrappedMap
        googleMapURL= {"https://maps.googleapis.com/maps/api/js?key=AIzaSyCMDctJ_CkM4qTAw5VXgpXg6uvmsSOIGh0&callback=initMap&libraries=&v=weekly"}
        loadingElement= {<div id="1" style={{width:"100%", height:"80%"}}/>}
        containerElement={<div id="2" style={{width:"100%", height:"80%"}}/>}
        mapElement={<div  id="3" style={{width:"100%", height:"80%", hidden:false}}/>}
        />
    </div>
  );
}

export default App;
