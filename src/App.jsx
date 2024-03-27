import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const App = () => {
  const initialValue = {
    email: "",
    password: "",
  };
  const handleSubmit = (value) => {
    console.log(value);
  };
  return (
    <div>
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validate={(value) => {
          const error = {};
          if (!value.email) {
            error.email = "Email is required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.email)
          ) {
            error.email = "Invalid email address";
          }

          if (!value.password) {
            error.password = "Password is required";
          }
          return error;
        }}
      >
        {() => (
          <>
            <Form className="  flex flex-col gap-3 max-w-lg px-10 mx-auto h-screen items-center justify-center">
              <div className="flex flex-col w-full">
                <label htmlFor="email" className="">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className=" border px-4 py-2 rounded"
                />
                <ErrorMessage
                  name="email"
                  className=" text-red-600"
                  component={"p"}
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="password" className="">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className=" border px-4 py-2 rounded"
                />
                <ErrorMessage
                  name="password"
                  className=" text-red-600"
                  component={"p"}
                />
              </div>
              <button
                type="submit"
                className=" border active:scale-95 transition-all bg-blue-500 rounded px-4 py-2 w-full"
              >
                Submit
              </button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};
//validate prop is custom
//validateschema is lib
export default App;
