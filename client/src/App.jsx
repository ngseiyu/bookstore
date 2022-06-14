import { useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";

const App = () => {
    const user = useSelector((state) => state.user.currentUser);
    return (
        <Router>
            <Routes>
                {/* <Route path="/" /> */}
                <Route index path="/" element={<Home />} />
                <Route path="login" element={user ? <Navigate replace to="/" /> : <Login />} />
                <Route path="register" element={user ? <Navigate replace to="/" /> : <Register />} />
                <Route path="products" element={<ProductList />} />
                <Route path="products/:productCategory" element={<ProductList />} />
                <Route path="product/:productId" element={<Product />} />
                <Route path="cart" element={<Cart />} />
            </Routes>
        </Router>
    );
};

export default App;