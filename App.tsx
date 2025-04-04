import { useNavigate } from 'react-router-dom';
// ...existing code...

function App() {
    const navigate = useNavigate();

    return (
        <div>
            {/* ...existing code... */}
            <button onClick={() => navigate('/build')}>Get Started</button>
            <button onClick={() => navigate('/upload')}>Upload</button>
            {/* ...existing code... */}
        </div>
    );
}

export default App;
