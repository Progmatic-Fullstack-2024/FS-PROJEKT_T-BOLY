import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function Contacts() {
  return (
    <div className="flex flex-col h-full">
      <div className="font-agbalumo text-6xl p-5">Contact</div>
      <div className="flex flex-row m-5">
        <div className="w-1/3 border rounded-xl p-5 m-5 grid place-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-11  text-orange-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0 6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
            />
          </svg>
          <p className="font-bold">Phonenumber</p>
          <p>123-456-7868</p>
        </div>

        <div className="w-1/3 border rounded-xl p-5 m-5 grid place-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-11  text-orange-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
          <p className="font-bold">Email</p>
          <p>info@tbolygames.example.com</p>
        </div>

        <div className="w-1/3 border rounded-xl p-5 m-5 grid place-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-11 text-orange-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <p className="font-bold">Addresse place</p>
          <p>Bécsi út 53-55</p>
          <p>1036, Budapest (HUNGARY)</p>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="w-2/3 m-5 text-center items-center ">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2694.007946620723!2d19.035464976789147!3d47.52870829335246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741d9583cee5b0f%3A0xc140539254ce4408!2sProgmatic%20Academy!5e0!3m2!1shu!2shu!4v1736574400135!5m2!1shu!2shu"
            width="100%"
            height="100%"
            allowfullscreen=""
            loading="lazy"
          />
        </div>

        <div className="w-1/3 m-10">
          <div className="font-agbalumo text-2xl pb-10">Contact Us</div>
          <Formik
            initialValues={{
              email: '',
              username: '',
              password: '',
            }}
            //   onSubmit={handleFormSubmit}
          >
            <Form className="space-y-8">
              <div>
                <Field
                  name="name"
                  type="name"
                  placeholder="Your name"
                  className="w-full p-2 border rounded-lg"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <Field
                  name="phone"
                  type="phone"
                  placeholder="Your name"
                  className="w-full p-2 border rounded-lg"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Your email address"
                  className="w-full p-2 border rounded-lg"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <Field
                  name="text"
                  type="text"
                  placeholder="Write your text"
                  className="w-full p-2 h-40 border rounded-lg"
                />
                <ErrorMessage
                  name="text"
                  component="TextField"
                  size="big"
                  className="text-red-500 text-sm"
                />
              </div>

              <button type="submit" className="bg-primary text-white w-full py-2 rounded-lg">
                Send
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
