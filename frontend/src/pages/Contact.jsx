import emailjs from 'emailjs-com';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FiPhone, FiMail } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { VITE_PUBLIC_KEY, VITE_SERVICE_ID } from '../constants/constants';
import { useContext } from 'react';
import LanguageContext from '../contexts/LanguageContext';

export default function Contacts() {
  const {t} = useContext(LanguageContext)
  const sendEmail = async (formData) => {
    try {
      const response = await emailjs.send(
        VITE_SERVICE_ID,
        'template_tfvk291',
        formData,
        VITE_PUBLIC_KEY,
      );
      toast.success('Email sent successfully');
      return response;
    } catch (error) {
      toast.error('Failed to send email:', error);
      throw error;
    }
  };

  const handleSave = (values, resetForm) => {
    sendEmail({
      email: 'puskasreka72@gmail.com',
      name: values.name,
      message: values.message,
      reply_to: values.email,
    });
    resetForm();
  };
  return (
    <div className="flex flex-col h-full">
      <div className="font-agbalumo mt-5 text-6xl p-5 text-center">{t('contact')}</div>
      <div className="flex md:flex-row m-5 flex-col">
        <div className="md:w-1/3 border rounded-xl p-5 m-5 grid place-items-center">
          <FiPhone className="text-orange-500 w-12 h-12" />
          <p className="font-bold">{t('phone number')}</p>
          <p>123-456-7868</p>
        </div>

        <div className="md:w-1/3 border rounded-xl p-5 m-5 grid place-items-center">
          <FiMail className="text-orange-500 w-12 h-12" />
          <p className="font-bold">{t('email')}</p>
          <p>info@tbolygames.example.com</p>
        </div>

        <div className="md:w-1/3 border rounded-xl p-5 m-5 grid place-items-center">
          <FaMapMarkerAlt className="text-orange-500 w-12 h-12" />
          <p className="font-bold">{t('adress')}</p>
          <p>Bécsi út 53-55</p>
          <p>1036, Budapest, Hungary</p>
        </div>
      </div>

      <div className="flex md:flex-row flex-col">
        <div className="md:w-2/3 m-5 text-center items-center h-80 md:h-auto">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2694.007946620723!2d19.035464976789147!3d47.52870829335246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741d9583cee5b0f%3A0xc140539254ce4408!2sProgmatic%20Academy!5e0!3m2!1shu!2shu!4v1736574400135!5m2!1shu!2shu"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
          />
        </div>

        <div className="md:w-1/3 m-10">
          <div className="font-agbalumo text-2xl pb-10">{t('contact us')}</div>
          <Formik
            initialValues={{
              email: '',
              message: '',
              phone: '',
              text: '',
            }}
            onSubmit={(values, { resetForm }) => handleSave(values, resetForm)}
          >
            <Form className="space-y-8">
              <div>
                <Field
                  name="name"
                  type="text"
                  placeholder={t('your name')}
                  className="w-full p-2 border rounded-lg"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <Field
                  name="phone"
                  type="tel"
                  placeholder={t('your phone number')}
                  className="w-full p-2 border rounded-lg"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder={t('your email adress')}
                  className="w-full p-2 border rounded-lg"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <Field
                  name="message"
                  as="textarea"
                  placeholder={t('write your message')}
                  className="w-full p-2 h-40 border rounded-lg"
                />
                <ErrorMessage name="message" component="div" className="text-red-500 text-sm" />
              </div>

              <button type="submit" className="bg-primary text-white w-full py-2 rounded-lg">
              {t('send message')}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
