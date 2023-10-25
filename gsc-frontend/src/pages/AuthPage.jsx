import { Outlet } from "react-router-dom"
import AuthHeader from "../components/AuthPage/AuthHeader"

const AuthPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <AuthHeader />
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AuthPage