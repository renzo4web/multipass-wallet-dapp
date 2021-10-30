import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../components/Layout";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
  )
}

export default MyApp
