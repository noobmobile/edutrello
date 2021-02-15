import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import {Layout} from "antd";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

function App() {
  return (
      <BrowserRouter>
          <Provider store={store}>
              <Layout>
                  <Header/>
                  <Content/>
                  <Footer/>
              </Layout>
          </Provider>
      </BrowserRouter>
  );
}

export default App;
