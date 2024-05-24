import { Field, Form, Formik, FormikValues } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import authServices from "../api/authServices";
import { useAuthContext } from "../context/authContext";
const initValue = {
  email: "",
  password: "",
};

const validation = yup.object().shape({
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

function LoginScreen() {
  const { setUser } = useAuthContext();

  const submitHandler = async (values: FormikValues) => {
    try {
      const { data } = await authServices.login(values.email, values.password);

      if (!data || !data?.user || !data?.token) {
        throw new Error("Failed login!");
      }
      setUser({ user: data?.user, token: data?.token });
    } catch (err: any) {
      const err_message = err?.response?.data?.message || "Failed login!";
      alert(err_message);
    }
  };

  return (
    <main className="flex-1 stack justify-center align-center">
      <div className="card stack">
        <div className="login-header stack">
          <h1>Login</h1>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
        </div>
        <Formik
          validationSchema={validation}
          onSubmit={submitHandler}
          initialValues={initValue}
        >
          {({ errors, touched }) => {
            const errorObj = Object.values(errors);
            const message = errorObj?.length ? errorObj[0] : null;

            const isTouched = !!Object.keys(touched)?.length;

            return (
              <Form autoComplete="off">
                <div className="stack gap-1">
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
                  <button type="submit">Login</button>
                  {isTouched && <div className="error">{message}</div>}
                </div>
              </Form>
            );
          }}
        </Formik>
        <Link to="/signup" className="text-center">
          Don't have an account to Login? Sign up here
        </Link>
      </div>
    </main>
  );
}

export default LoginScreen;
