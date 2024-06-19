import {Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import { signInSchema } from "../services/validationSchema";
import { signInApi } from "../services/apiCall";
import useAuth from "./context/AuthProvider";
import InputField from "./common/Input";

export default function SignIn() {
  const { login } = useAuth();
  const [btnDis, setBtnDis] = useState(false);
  const navigate = useNavigate();
  const validationSchema = signInSchema();
  return (
    <section className="bg-gradient-to-r from-indigo-300 to-purple-300 min-h-screen flex items-center justify-center">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-indigo-100 rounded-lg shadow-lg px-6 py-8 sm:px-10 md:px-16 xyz">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 sm:text-3xl">
          Sign in to your account
        </h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              setBtnDis(true);
              const response = await signInApi(values);
              console.log("Login Successful:", response.data);
              login();
              localStorage.setItem("token", response.data.token);
              if (response.status === 200) {
                resetForm();
                toast.custom((t) => (
                  <div
                    className={`${
                      t.visible ? "animate-enter" : "animate-leave"
                    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                  >
                    <div className="flex-1 w-0 p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={response.data.data.image}
                            alt=""
                          />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {response.data.data.name}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            Successfully ! Login
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex border-l border-gray-200">
                      <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ));
                if (response.data.data.roleId === 4) {
                  setTimeout(() => navigate("/student"), 1000);
                } else if (
                  response.data.data.roleId === 3 ||
                  response.data.data.roleId === 2
                ) {
                  setTimeout(() => navigate("/staff"), 1000);
                } else {
                  setTimeout(() => navigate("/admin"), 1000);
                }
              }
            } catch (e) {
              console.error("Login failed:", e);
              toast.error(e.response.data.message);
            } finally {
              setBtnDis(false);
            }
          }}
        >
          {() => (
            <Form>
              <InputField
                labelName="Your E-mail"
                inputType="email"
                inputName="email"
                placeholder="name@company.com"
              />
              <InputField
                labelName="Password"
                inputType="password"
                inputName="password"
                placeholder="••••••••"
              />
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Field
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-indigo-600"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-gray-700 font-bold"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot"
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                disabled={btnDis}
                type="submit"
                className={`w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  btnDis ? "cursor-not-allowed" : "hover:bg-indigo-700"
                }`}
              >
                Sign in
              </button>
              <p className="text-center text-gray-700 mt-6">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-indigo-600 hover:text-indigo-800 font-bold"
                >
                  Sign up
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
