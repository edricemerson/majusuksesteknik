import './App.css'
import { LanguageProvider } from './language/LanguageProvider.tsx'
import Navbar from './assets/Navbar.tsx'
import Home from './assets/Home.tsx'
import AboutUs from './assets/AboutUs.tsx'
import Review from './assets/Review.tsx'
import Footer from './assets/Footer.tsx'

function App() {
return (
    <LanguageProvider>
        <div>
            <Navbar />
            <Home />
            <AboutUs />
            <Review />
            <Footer />
        </div>
    </LanguageProvider>
)
}

export default App
