import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="flex bg-fixed bg-center shadow-inner bg-cover bg-[url('https://www.picishop.hu/adat/hero2.jpg')] ">
      <div className="flex h-[700px] justify-end w-screen">
        <div className="flex-1"> </div>
        <div className="flex-1 w-1/2 m-auto">
          <p className="animate-fadeInRight font-agbalumo text-orange-500 drop-shadow-[4px_4px_2px_rgba(255,255,255,0.90)] text-6xl pb-20 pr-20">
            Crafting smiles with every toy, made for learning, fun, and growth
          </p>
          <div className="pl-10">
            <Link
              type="button"
              className="bg-orange-400 hover:bg-orange-500 text-white text-2xl hover:drop-shadow drop-shadow-[3px_3px_1px_rgba(255,255,255,0.90)] py-4 px-10 rounded-full"
              to="/products/category/all"
            >
              Shop now
            </Link>
          </div>

          <div>
            <p className="flex-1 w-140 font-agbalumo text-orange-500 drop-shadow-[3px_3px_1px_rgba(255,255,255,0.90)] content-center text-3xl pt-20  pr-20">
              ... how do you start?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
