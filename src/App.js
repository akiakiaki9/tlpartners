import './styles/styles.css'
import './styles/header.css'
import './styles/navbar.css'
import './styles/section.css'
import './styles/section2.css'
import './styles/section3.css'
import './styles/section4.css'
import './styles/form.css'
import './styles/footer.css'
import './styles/footer2.css'
import './styles/switcher.css'
import './styles/chooser.css'
import './styles/exp.css'
import './styles/detail.css'
import './styles/pagename.css'
import './styles/licence.css'
import './styles/modal.css'

import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ExperienceDetail from './pages/ExperienceDetail'
import ScrolledPage from './ScrolledPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ScrolledPage />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/experience/:id' element={<ExperienceDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;