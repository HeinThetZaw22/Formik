import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const App = () => {
  const [date, setDate] = useState();
  const initialValue = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    password: yup
      .string()
      .required("Password is required")
      .min(4, "It must be 4 characters at least")
      .max(8, "8 characters at most")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
  });
  const handleSubmit = (value) => {
    console.log(value);
  };
  return (
    <div className="p-5 max-w-lg mx-auto mt-[300px]">
      <div className="flex justify-between">
        <Dialog>
          <DialogTrigger className=" border rounded px-4 py-2 bg-slate-950 text-white">
            Open
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                " text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <>
            <Form className="  flex flex-col gap-3  mx-auto  items-center justify-center">
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
              {/* <button>Submit</button> */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className=" border active:scale-95 transition-all  rounded px-4 py-2 w-full"
              >
                Add
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};
//validate prop is custom
//validateschema is lib

// validate={(value) => {
//     const error = {};
//     if (!value.email) {
//       error.email = "Email is required";
//     } else if (
//       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.email)
//     ) {
//       error.email = "Invalid email address";
//     }

//     if (!value.password) {
//       error.password = "Password is required";
//     }
//     return error;
//   }}

export default App;
