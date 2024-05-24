import { Field, Form, Formik, FormikValues } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useAuthContext } from "../context/authContext";
import authServices from "../api/authServices";
const initValue = {
  email: "",
  password: "",
  name: "",
};

const validation = yup.object().shape({
  name: yup.string().required().label("Name").max(100).min(3),
  email: yup.string().email().required().label("Email").max(100).min(6),
  password: yup
    .string()
    .required()
    .label("Password")
    .max(16)
    .min(8)
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    ),
});

function SignupScreen() {
  const { setUser } = useAuthContext();

  const submitHandler = async (values: FormikValues) => {
    try {
      const { data } = await authServices.signup(
        values.email,
        values.password,
        values.name
      );

      if (!data || !data?.user || !data?.token) {
        throw new Error("Failed signup!");
      }
      setUser({ user: data?.user, token: data?.token });
    } catch (err: any) {
      const err_message = err?.response?.data?.message || "Failed signup!";
      alert(err_message);
    }
  };

  return (
    <main className="flex-1 stack justify-center align-center">
      <div className="card stack">
        <div className="login-header stack">
          <h1>Signup here</h1>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
        </div>
        <Formik
          validationSchema={validation}
          onSubmit={submitHandler}
          initialValues={initValue}
        >
          {({ errors }) => {
            const errorObj = Object.values(errors);
            const message = errorObj?.length ? errorObj[0] : null;

            return (
              <Form autoComplete="off">
                <div className="stack gap-1">
                  <Field as="input" name="name" placeholder="Enter your name" />
                  <Field
                    as="input"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                  <Field
                    as="input"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                  <button type="submit">Sign up</button>
                  <div className="error">{message}</div>
                </div>
              </Form>
            );
          }}
        </Formik>
        <Link to="/login" className="text-center">
          Already have an account to Login? Sign in here
        </Link>
      </div>
    </main>
  );
}

export default SignupScreen;
