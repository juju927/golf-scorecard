import background from "../../assets/images/golf-background.webp";

const AuthHeader = () => {
  return (
    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
      <img
        src={background}
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      <div className="hidden lg:relative lg:block lg:p-12">
        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Welcome to golf buddy ⛳️
        </h2>

        <p className="mt-4 leading-relaxed text-white/90">
          Golf buddy records and remembers for you so you can focus on playing
          your best.
        </p>
      </div>
    </section>
  );
};

export default AuthHeader;
