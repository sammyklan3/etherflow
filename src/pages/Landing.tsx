import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Networks from '../components/Networks';
import Footer from '../components/Footer';
import CTA from '../components/CTA';

const Landing = () => {
    return (
        <div className="w-full">
            <Navbar />
            <Hero />
            <Networks />
            <Features />
            <HowItWorks />
            <CTA />
            <Footer />
        </div>
    )
}

export default Landing;
