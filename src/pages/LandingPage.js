import React from "react";
import Header from "../components/Header";
import { LOGIN_SVG } from "./constants";

const LandingPage = (props) => {
  return (
    <div>
      <Header />
      <main className="flex flex-col items-center gap-10">
        {/* Intro Section */}
        <section className="max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-8 h-[70vh] mt-[80px] px-6">
          <div className="">
            <h1 className="w-full font-bold text-left mb-5 text-transparent bg-gradient-to-r from-[#3A0CA3] via-pink-500 to-red-500 bg-clip-text text-[clamp(2rem,6vw,4rem)] leading-tight">
              Smart Booking for Modern Services
            </h1>

            <p className="text-xl">
              Streamline your barbershop business with our easy-to-use platform.
              Accept bookings 24/7, manage your schedule, and grow your client
              base - all in one place.
            </p>

            {/* Buttons */}
            <div className="mt-5 flex flex-row gap-3">
              <button className="w-fit font-bold text-[20px] border border-[#3A0CA3] rounded-[10px] px-5 py-2 bg-[#3A0CA3] text-white transition duration-300 ease-in-out transform hover:-translate-y-[2px] hover:shadow-lg">
                Signup
              </button>
              <button className="w-fit font-bold text-[20px] border border-[#3A0CA3] rounded-[10px] px-5 py-2 text-[#3A0CA3] transition duration-300 ease-in-out transform hover:-translate-y-[2px] hover:shadow-lg">
                Login
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img
              src="/your-image-path.jpg" // Replace with your image path
              alt="Booking Illustration"
              className="max-w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </section>

        {/* Types of Services Section */}
        <section className="px-6 pb-6 pt-0 flex flex-col items-center">
          <h1 className="text-center text-[clamp(2rem,6vw,4rem)] mb-5 font-bold text-left leading-[30px]">
            Easy way to access services
          </h1>
          <p className="text-xl text-center">
            Our platform is designed to make service booking simple and
            efficient for both service providers and customers.
          </p>
          <div className="mt-10 flex flex-wrap flex-row gap-y-4 justify-between w-full max-w-[1200px] m-0 p-0">
            <div
              className="bg-white rounded-[12px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02]
                                        w-full sm:w-[360px] md:w-[360px] lg:w-[360px]
                                        min-w-[360px]
                                        h-auto sm:h-auto md:h-auto lg:h-auto
                                        "
            >
              {LOGIN_SVG}
              <h3 className="text-[2.5rem] font-bold mb-3 mt-3 text">
                Instant Booking
              </h3>
              <p className="text-xl">
                Customers can book appointments in seconds with our streamlined
                booking process and QR code scanning.
              </p>
            </div>

            <div
              className="bg-white rounded-[12px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02]
                                        w-full sm:w-[360px] md:w-[360px] lg:w-[360px]
                                        min-w-[360px]
                                        h-auto sm:h-auto md:h-auto lg:h-auto
                                        "
            >
              {LOGIN_SVG}
              <h3 className="text-[2.5rem] font-bold mb-3 mt-3 text">
                Instant Booking
              </h3>
              <p className="text-xl">
                Customers can book appointments in seconds with our streamlined
                booking process and QR code scanning.
              </p>
            </div>

            <div
              className="bg-white rounded-[12px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02]
                                        w-full sm:w-[360px] md:w-[360px] lg:w-[360px]
                                        min-w-[360px]
                                        h-auto sm:h-auto md:h-auto lg:h-auto
                                        "
            >
              {LOGIN_SVG}
              <h3 className="text-[2.5rem] font-bold mb-3 mt-3 text">
                Instant Booking
              </h3>
              <p className="text-xl">
                Customers can book appointments in seconds with our streamlined
                booking process and QR code scanning.
              </p>
            </div>

            <div
              className="bg-white rounded-[12px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02]
                                        w-full sm:w-[360px] md:w-[360px] lg:w-[360px]
                                        min-w-[360px]
                                        h-auto sm:h-auto md:h-auto lg:h-auto
                                        "
            >
              {LOGIN_SVG}
              <h3 className="text-[2.5rem] font-bold mb-3 mt-3 text">
                Instant Booking
              </h3>
              <p className="text-xl">
                Customers can book appointments in seconds with our streamlined
                booking process and QR code scanning.
              </p>
            </div>

            <div
              className="bg-white rounded-[12px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02]
                                        w-full sm:w-[360px] md:w-[360px] lg:w-[360px]
                                        min-w-[360px]
                                        h-auto sm:h-auto md:h-auto lg:h-auto
                                        "
            >
              {LOGIN_SVG}
              <h3 className="text-[2.5rem] font-bold mb-3 mt-3 text">
                Instant Booking
              </h3>
              <p className="text-xl">
                Customers can book appointments in seconds with our streamlined
                booking process and QR code scanning.
              </p>
            </div>

            <div
              className="bg-white rounded-[12px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02]
                                        w-full sm:w-[360px] md:w-[360px] lg:w-[360px]
                                        min-w-[360px]
                                        h-auto sm:h-auto md:h-auto lg:h-auto
                                        "
            >
              {LOGIN_SVG}
              <h3 className="text-[2.5rem] font-bold mb-3 mt-3 text">
                Instant Booking
              </h3>
              <p className="text-xl">
                Customers can book appointments in seconds with our streamlined
                booking process and QR code scanning.
              </p>
            </div>

            <div
              className="bg-white rounded-[12px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02]
                                        w-full sm:w-[360px] md:w-[360px] lg:w-[360px]
                                        min-w-[360px]
                                        h-auto sm:h-auto md:h-auto lg:h-auto
                                        "
            >
              {LOGIN_SVG}
              <h3 className="text-[2.5rem] font-bold mb-3 mt-3 text">
                Instant Booking
              </h3>
              <p className="text-xl">
                Customers can book appointments in seconds with our streamlined
                booking process and QR code scanning.
              </p>
            </div>

            <div
              className="bg-white rounded-[12px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02]
                                        w-full sm:w-[360px] md:w-[360px] lg:w-[360px]
                                        min-w-[360px]
                                        h-auto sm:h-auto md:h-auto lg:h-auto
                                        "
            >
              {LOGIN_SVG}
              <h3 className="text-[2.5rem] font-bold mb-3 mt-3 text">
                Instant Booking
              </h3>
              <p className="text-xl">
                Customers can book appointments in seconds with our streamlined
                booking process and QR code scanning.
              </p>
            </div>

            <div
              className="bg-white rounded-[12px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02]
                                        w-full sm:w-[360px] md:w-[360px] lg:w-[360px]
                                        min-w-[360px]
                                        h-auto sm:h-auto md:h-auto lg:h-auto
                                        "
            >
              {LOGIN_SVG}
              <h3 className="text-[2.5rem] font-bold mb-3 mt-3 text">
                Instant Booking
              </h3>
              <p className="text-xl">
                Customers can book appointments in seconds with our streamlined
                booking process and QR code scanning.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-10 text-center">
        <p>&copy; {new Date().getFullYear()} MySite. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
