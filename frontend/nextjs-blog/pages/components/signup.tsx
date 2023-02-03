import { Formik, Field, Form, FormikHelpers } from 'formik';
import styles from './signup'

interface Values {
    username: string;
    password: string;
}

export default function SignupForm() {
    return (
      <div>
        <h1 className="display-6 mb-3">Sign up</h1>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}

          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}

        >
          <Form>
            <div className="mb-3">
              <Field className="form-control" id="username" name="username" placeholder="Username" aria-describedby="usernameHelp" />
            </div>
  
            <div className="mb-3">
              <Field className="form-control" id="password" name="password" placeholder="Password" type="password" />
            </div>

            <button type="submit" className="btn btn-primary">Sign up</button>
          </Form>
        </Formik>
      </div>
    );
  };