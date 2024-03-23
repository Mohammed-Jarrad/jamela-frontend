import '@/lib/froala.ts'
import '@radix-ui/themes/styles.css'
import axios from 'axios'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import Providers from './components/providers/providers.tsx'
import './index.css'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

axios.defaults.headers['Content-Type'] =
    axios.defaults.headers['Content-Type'] || 'application/json'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Providers>
        <App />
    </Providers>
)
