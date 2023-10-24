import LandingHeader from "../../components/HomePage/LandingHeader";
import SignUpForm from "../../components/HomePage/SignUpForm";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <LandingHeader />
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <SignUpForm />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
