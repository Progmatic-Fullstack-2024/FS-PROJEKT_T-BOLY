import { useContext } from 'react';

import Logo from '../assets/ant-orange.png';
import LanguageContext from '../contexts/LanguageContext';

export default function About() {
  const { t } = useContext(LanguageContext);
  return (
    <div>
      <div className="flex flex-col h-full dark:text-primary dark:bg-gray-700">,</div>
      <div className="font-agbalumo text-6xl p-5 text-center dark:text-primary dark:bg-gray-800">{t('about us')}</div>
      <div className="px-8 md:px-36 py-10 text-justify dark:text-primary dark:bg-gray-800">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis asperiores vero natus,
          illo eveniet quam repellat eaque minima, provident, perferendis libero reiciendis sequi
          nam laboriosam repellendus molestias sed exercitationem architecto. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Officiis asperiores vero natus, illo eveniet quam
          repellat eaque minima, provident, perferendis libero reiciendis sequi nam laboriosam
          repellendus molestias sed exercitationem architecto. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Officiis asperiores vero natus, illo eveniet quam repellat
          eaque minima, provident, perferendis libero reiciendis sequi nam laboriosam repellendus
          molestias sed exercitationem architecto. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Officiis asperiores vero natus, illo eveniet quam repellat eaque minima,
          provident, perferendis libero reiciendis sequi nam laboriosam repellendus molestias sed
          exercitationem architecto. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Officiis asperiores vero natus, illo eveniet quam repellat eaque minima, provident,
          perferendis libero reiciendis sequi nam laboriosam repellendus molestias sed
          exercitationem architecto. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Officiis asperiores vero natus, illo eveniet quam repellat eaque minima, provident,
          perferendis libero reiciendis sequi nam laboriosam repellendus molestias sed
          exercitationem architecto. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Officiis asperiores vero natus, illo eveniet quam repellat eaque minima, provident,
          perferendis libero reiciendis sequi nam laboriosam repellendus molestias sed
          exercitationem architecto. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Officiis asperiores vero natus, illo eveniet quam repellat eaque minima, provident,
          perferendis libero reiciendis sequi nam laboriosam repellendus molestias sed
          exercitationem architecto.
        </p>
      </div>
      <div className="flex flex-row justify-center items-center  dark:text-primary dark:bg-gray-800">
        <img src={Logo} alt="" className="h-10" />
      </div>
    </div>
  );
}
