import './App.css';

import Nav from './nav.jsx';
import BWmain from './Body/bodywrapper.jsx';

function App() {
  return (
    <>
      <div className='nav'><Nav /></div>
      <div className='body'><BWmain/></div>
    </>
  );
}

export default App;
