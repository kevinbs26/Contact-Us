import Image from "next/image";
import { useState } from "react";
import Swal from 'sweetalert2';

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", content: "" });
  const [formSubscriptionData, setFormSubscriptionData] = useState({ email: ""});
  const [formUnsubscribeData, setFormSubscribeData] = useState({ email: ""});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/FormFeedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Message sent!!',
          text: 'You have successfully send to us,',
          confirmButtonColor: '#3085d6',
        });
        setFormData({ name: '', email: '', content: '' });
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
        confirmButtonColor: '#d33',
      });
    }
  };

  const handleSubmitSubscriptionForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/FormSubcripstion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formSubscriptionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Subscription failed');
      }

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Subscribed!',
          text: 'You have successfully subscribed to our newsletter.',
          confirmButtonColor: '#3085d6'
        });
        setFormSubscriptionData({ email: ''});
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
        confirmButtonColor: '#d33',
      });
    }
  };

  const handleSubmitUnsubscribeForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/FormUnsubscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formUnsubscribeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'unSubscribe failed');
      }

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Unsubscribed!',
          text: 'You have successfully unsubscribed to our newsletter.',
          confirmButtonColor: '#3085d6',
        });
        setFormSubscribeData({ email: ''});
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-green-400 to-blue-500 text-white" >
      <div
        className="w-full h-80 flex flex-col items-center justify-center relative bg-cover bg-center"
        style={{
          backgroundImage: `url('/night_city.png')`
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-white bg-opacity-70 text-black p-4 rounded-lg">
          Let's have a talk
        </h1>
      </div>

      <div className="flex flex-col md:flex-row w-full bg-white text-gray-800 p-8 rounded-lg shadow-lg">
        
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-2">📞 +62 123123123</p>
          <p className="mb-2">✉️ contact_us@Contact.com</p>
          <p>📍 Jakarta</p>
          
          <div className="mt-10">

          <hr className="my-8 border-t border-gray-300" />

          <h2 className="text-2xl font-semibold mt-10 mb-4">Get us in your inbox </h2>
          <form onSubmit={handleSubmitSubscriptionForm} className="flex flex-col md:flex-row">
            <input
              type="email"
              value={formSubscriptionData.email}
              onChange={(e) => setFormSubscriptionData({ ...formSubscriptionData, email: e.target.value })}
              placeholder="Enter your email"
              className="p-2 border rounded mb-4 md:mb-0 md:mr-4 w-full md:w-3/4"
              required
            />
            <button type="submit" className="p-2 bg-green-500 text-white rounded w-full md:w-1/4">
              Subscribe
            </button>
        </form>
        
        <div className="mt-3">
          Too much mailing ? try {' '}
          <span
          onClick={() => setIsModalOpen(true)}
          className="text-green-500 underline cursor-pointer"
          >
            Unsubscribe
          </span>
        </div>
        

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-10 rounded-lg w-11/12 md:w-1/3">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Unsubscribe</h2>
              <form onSubmit={handleSubmitUnsubscribeForm} className="flex flex-col">
                <label className="mb-2">Email</label>
                <input
                  type="email"
                  value={formUnsubscribeData.email}
                  onChange={(e) => setFormSubscribeData({ ...formUnsubscribeData, email: e.target.value })}
                  placeholder="Enter your email to unsubscribe"
                  className="p-2 border rounded mb-4"
                  required
                />
                <button type="submit" className="p-2 bg-red-500 text-white rounded">
                  Unsubscribe
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 p-2 bg-gray-300 text-gray-800 rounded"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

          </div>
        </div>

        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-semibold mb-4">Pitch us</h2>
          <form onSubmit={handleSubmitForm} className="flex flex-col">
            <label className="mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="p-2 border rounded mb-4"
              required
            />

            <label className="mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="p-2 border rounded mb-4"
              required
            />

            <label className="mb-2">Message</label>
            <textarea
              name="message"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="p-2 border rounded mb-4"
              required
            ></textarea>

            <button type="submit" className="p-2 bg-green-500 text-white rounded">
              Send
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
