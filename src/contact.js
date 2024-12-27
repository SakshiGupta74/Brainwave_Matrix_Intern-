import React, { useState } from 'react';

const Contact = () => {
  const [contactVisible, setContactVisible] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-grow">
        <h1 className="text-center text-2xl font-bold my-6">Welcome to My App</h1>
        <p className="text-center text-gray-600">Explore our amazing features!</p>
      </div>

      {/* Footer */}
      <footer
        className={`fixed inset-x-0 bottom-0 transition-all duration-500 ease-in-out ${
          contactVisible ? 'h-auto bg-indigo-600 text-white' : 'h-16 bg-gray-800 text-gray-400'
        }`}
      >
        {!contactVisible ? (
          <div className="flex justify-between items-center h-full px-6">
            <span>© 2024 My App. All Rights Reserved.</span>
            <button
              onClick={() => setContactVisible(true)}
              className="text-white bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-500 transition"
            >
              Contact Us
            </button>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Contact Us</h2>
              <button
                onClick={() => setContactVisible(false)}
                className="text-white bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-600 transition"
              >
                Close
              </button>
            </div>
            <p className="mb-2">
              If you have any questions or feedback, feel free to reach out!
            </p>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Your Message"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-500 hover:text-white transition-all"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </footer>
    </div>
  );
};

export default Contact;
