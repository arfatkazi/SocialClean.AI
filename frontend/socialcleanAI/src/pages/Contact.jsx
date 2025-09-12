import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for reaching out! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
        Have questions? Fill out the form below or reach us via email.
      </p>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea
            name="message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition"
        >
          Send Message
        </button>
      </form>

      {/* Support + Socials */}
      <div className="text-center mt-10 space-y-4">
        <p>
          Or email us directly:{" "}
          <a
            href="mailto:support@socialcleanai.com"
            className="text-indigo-600 dark:text-indigo-400 font-medium"
          >
            support@socialcleanai.com
          </a>
        </p>

        <div className="flex justify-center gap-6 text-2xl">
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            🐦
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            📘
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            📸
          </a>
        </div>
      </div>
    </div>
  );
}
