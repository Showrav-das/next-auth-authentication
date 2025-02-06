"use client";
import React, { useState } from "react";

export default function page() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function requestPasswordReset(formData: any) {
    const email = formData.get("email");

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Password reset link sent to your email.");
      } else {
        setMessage("Failed to send reset link. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  }
  return (
    <div>
      <h1>Forgot Password</h1>
      <form action={requestPasswordReset}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
