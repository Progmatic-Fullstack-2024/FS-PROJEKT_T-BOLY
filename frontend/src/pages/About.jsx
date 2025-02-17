import { useContext } from 'react';

import Logo from '../assets/ant-orange.png';
import LanguageContext from '../contexts/LanguageContext';

export default function About() {
  const { t } = useContext(LanguageContext);
  return (
    <div className="flex flex-col items-center justify-center px-8 md:px-36 text-justify">
      <h1 className="font-agbalumo text-6xl p-10 mb-5 text-center">{t('about us')}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis asperiores vero natus,
        illo eveniet quam repellat eaque minima, provident, perferendis libero reiciendis sequi nam
        laboriosam repellendus molestias sed exercitationem architecto. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Officiis asperiores vero natus, illo eveniet quam repellat
        eaque minima, provident, perferendis libero reiciendis sequi nam laboriosam repellendus
        molestias sed exercitationem architecto. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Officiis asperiores vero natus, illo eveniet quam repellat eaque minima, provident,
        perferendis libero reiciendis sequi nam laboriosam repellendus molestias sed exercitationem
        architecto. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis asperiores
        vero natus, illo eveniet quam repellat eaque minima, provident, perferendis libero
        reiciendis sequi nam laboriosam repellendus molestias sed exercitationem architecto. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Officiis asperiores vero natus, illo
        eveniet quam repellat eaque minima, provident, perferendis libero reiciendis sequi nam
        laboriosam repellendus molestias sed exercitationem architecto. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Officiis asperiores vero natus, illo eveniet quam repellat
        eaque minima, provident, perferendis libero reiciendis sequi nam laboriosam repellendus
        molestias sed exercitationem architecto. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Officiis asperiores vero natus, illo eveniet quam repellat eaque minima, provident,
        perferendis libero reiciendis sequi nam laboriosam repellendus molestias sed exercitationem
        architecto. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis asperiores
        vero natus, illo eveniet quam repellat eaque minima, provident, perferendis libero
        reiciendis sequi nam laboriosam repellendus molestias sed exercitationem architecto.
      </p>
      <img src={Logo} alt="" className="h-10 mt-16" />
    </div>
  );
}
