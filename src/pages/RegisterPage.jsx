import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { validateRegister } from "../utils/validation";

export default function RegisterPage() {
  const { register, checkUsername } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const usernameCheckId = useRef(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...values, [name]: value };
    setValues(updated);
    setApiError("");
    setErrors(validateRegister(updated));

    if (name === "username" && value.length >= 3) {
      const currentCheckId = ++usernameCheckId.current;
      checkUsername(value.trim())
        .then((exists) => {
          if (currentCheckId === usernameCheckId.current && exists) {
            setErrors((prev) => ({
              ...prev,
              username: "Username already exists",
            }));
          }
        })
        .catch(() => {
          if (currentCheckId === usernameCheckId.current) {
            setApiError("Unable to check username. Please try again.");
          }
        });
    } else if (name === "username") {
      usernameCheckId.current += 1;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegister(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setApiError("");
    try {
      await register(values);
      navigate("/dashboard");
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Unable to register.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        {apiError && (
          <p className="text-red-500 text-sm mb-4">{apiError}</p>
        )}

        <input
          name="fullName"
          autoComplete="name"
          required
          minLength={2}
          placeholder="Full Name"
          value={values.fullName}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-1"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mb-2">{errors.fullName}</p>
        )}

        <input
          name="username"
          autoComplete="username"
          required
          minLength={3}
          maxLength={20}
          placeholder="Username"
          value={values.username}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-1"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mb-2">{errors.username}</p>
        )}

        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-1"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email}</p>
        )}

        <input
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={6}
          required
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-1"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white p-2 rounded mt-4 hover:bg-green-700"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}