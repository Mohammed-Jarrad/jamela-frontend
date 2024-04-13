import Root from '@/components/routes/root'
import { useUserContext } from '@/context/UserContextProvider'
import AdminCategories from '@/pages/Admin/categories/admin-categories/admin-categories'
import CreateCategory from '@/pages/Admin/categories/create-category/create-category'
import UpdateCategory from '@/pages/Admin/categories/update-category/update-category'
import AdminCoupons from '@/pages/Admin/coupons/admin-coupons'
import CreateCoupon from '@/pages/Admin/coupons/create-coupon'
import UpdateCoupon from '@/pages/Admin/coupons/update-coupon'
import Images from '@/pages/Admin/images/images'
import MainDashboardContent from '@/pages/Admin/main/main-dashboard-content'
import AdminOrders from '@/pages/Admin/orders/admin-orders/admin-orders'
import AdminProducts from '@/pages/Admin/products/admin-products/admin-products'
import CreateProduct from '@/pages/Admin/products/create-product/create-product'
import UpdateProduct from '@/pages/Admin/products/update-product/update-product'
import AdminSubcategories from '@/pages/Admin/subcategories/admin-subcategories/admin-subcategories'
import CreateSubcategory from '@/pages/Admin/subcategories/create-sub/create-subcategory'
import UpdateSubcategory from '@/pages/Admin/subcategories/update-sub/update-subcategory'
import AdminUsers from '@/pages/Admin/users/admin-users'
import CheckCode from '@/pages/auth/check-code/check-code'
import ForgetPassword from '@/pages/auth/forget-password/forget-password'
import Login from '@/pages/auth/login/login'
import ResetPassword from '@/pages/auth/reset-password/reset-password'
import SignUp from '@/pages/auth/sign-up/sign-up'
import Cart from '@/pages/cart/cart'
import Category from '@/pages/category/category'
import Home from '@/pages/home/home'
import Notfound from '@/pages/not-found/not-found'
import Product from '@/pages/product/product'
import Profile from '@/pages/profile/profile'
import Shop from '@/pages/shop/shop'
import Test from '@/pages/test-page/test'
import ScrollWhenRefresh from '@/utils/scroll-when-refresh'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminRoot from './routes/admin-root'
import UserRoutes from './routes/user-routes'
import AuthRoot from "./routes/auth-root"
import UserOrderDetails from "@/pages/user-order-details/user-order-details"

const MainContent = () => {
    const { token } = useUserContext()

    return (
        <main className="grid min-h-full-screen-header grid-cols-1">
            <ScrollWhenRefresh>
                <Routes>
                    {/* Auth Routes  */}
                    <Route path="auth" element={<AuthRoot />}>
                        <Route element={token && <Navigate to={'/'} />}>
                            <Route path="signup" element={<SignUp />} />
                            <Route path="login" element={<Login />} />
                        </Route>
                        <Route path="forget-password" element={<ForgetPassword />} />
                        <Route path="check-code/:token" element={<CheckCode />} />
                        <Route path="reset-password/:token" element={<ResetPassword />} />
                    </Route>

                    {/* Non Admin Routes */}
                    <Route path="/" element={<Root />}>
                        <Route index element={<Home />} />
                        <Route path="product/:slug" element={<Product />} />
                        <Route path="category/:slug" element={<Category />} />
                        <Route path="shop" element={<Shop />} />

                        {/* User Routes */}
                        <Route element={<UserRoutes />}>
                            <Route path="cart" element={<Cart />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="order/:id" element={<UserOrderDetails />} />
                        </Route>
                        {/* Not Found */}
                        <Route path="*" element={<Notfound />} />
                    </Route>

                    {/* Admin Routes */}
                    <Route path="/dashboard" element={<AdminRoot />}>
                        {/* Main Dashboard Content */}
                        <Route index element={<MainDashboardContent />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="forget-password" element={<ForgetPassword />} />
                        <Route path="check-code/:token" element={<CheckCode />} />
                        <Route path="reset-password/:token" element={<ResetPassword />} />
                        {/* Admin Categories routes */}
                        <Route path="categories">
                            <Route index element={<AdminCategories />} />
                            <Route path="create" element={<CreateCategory />} />
                            <Route path="update/:slug" element={<UpdateCategory />} />
                        </Route>
                        {/* Admin Subcategories routes */}
                        <Route path="subcategories">
                            <Route index element={<AdminSubcategories />} />
                            <Route path="update/:slug" element={<UpdateSubcategory />} />
                            <Route path="create" element={<CreateSubcategory />} />
                        </Route>
                        {/* Amin Products routes */}d
                        <Route path="products">
                            <Route index element={<AdminProducts />} />
                            <Route path="create" element={<CreateProduct />} />
                            <Route path="update/:slug" element={<UpdateProduct />} />
                        </Route>
                        {/* Admin Coupons routes */}
                        <Route path="coupons">
                            <Route index element={<AdminCoupons />} />
                            <Route path="create" element={<CreateCoupon />} />
                            <Route path="update/:id" element={<UpdateCoupon />} />
                        </Route>
                        {/* Admin Orders routes */}
                        <Route path="orders">
                            <Route index element={<AdminOrders />} />
                            <Route path=":id" element={<UserOrderDetails />} />
                        </Route>
                        {/* Admin Users routes */}
                        <Route path="users" element={<AdminUsers />} />
                        <Route path="images" element={<Images />} />
                        {/* not found */}
                        <Route path="*" element={<Notfound />} />
                    </Route>

                    {/* Test Page */}
                    <Route path="/test" element={<Test />} />

                    <Route path="*" element={<Notfound />} />
                </Routes>
            </ScrollWhenRefresh>
        </main>
    )
}
export default MainContent
