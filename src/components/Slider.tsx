import { Link } from "react-router-dom";

export default function Slider() {
  return (
    <section className="carousel w-full bg-gray-900 py-10">
      <div id="slide1" className="carousel-item relative w-full text-white">
        <div className="grid grid-cols-2 mx-auto space-x-2">
          <div className="md:flex justify-center">
            <img
              className="sm:w-36 md:w-72"
              src="https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Quran_Theke_Newa_JIboner_Pat-Arif_Azad-d0906-279506.jpg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div>
              <h3 className="md:text-3xl sm:text-lg">
                কুরআন থেকে নেওয়া জীবনের পাঠ (পেপারব্যাক)
              </h3>
              <h6 className="lg:text-xl text-sm py-5">by আরিফ আজাদ</h6>
              <div>
                <div className="rating lg:rating-lg sm:rating-sm">
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                    checked
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                  />
                </div>
              </div>
              <button className="my-3 lg:my-5 btn btn-xs md:btn-md text-sm border-none bg-white hover:bg-cyan-600">
                <Link to="/books">All books</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" className="btn btn-circle btn-sm md:btn-md">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle btn-sm md:btn-md">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full text-white">
        <div className="grid grid-cols-2 mx-auto space-x-2">
          <div className="flex justify-center">
            <img
              src="https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Bela_Furabar_Age-Arif_Azad-e517b-195175.png"
              className="sm:w-36 md:w-72"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div>
              <h3 className="md:text-3xl sm:text-lg">
                বেলা ফুরাবার আগে (পেপারব্যাক)
              </h3>
              <h6 className="lg:text-xl text-sm py-5">by আরিফ আজাদ</h6>
              <div>
                <div className="rating lg:rating-lg sm:rating-sm">
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                    checked
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                  />
                </div>
              </div>
              <button className="my-3 lg:my-5 btn btn-xs md:btn-md text-sm border-none bg-white hover:bg-cyan-600">
                <Link to="/books">All books</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle btn-sm md:btn-md">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle btn-sm md:btn-md">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full text-white">
        <div className="grid grid-cols-2 mx-auto space-x-2">
          <div className="flex justify-center">
            <img
              src="https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Englishe_durbolder_jonno_VOCAB_Therapy-Saiful_Islam-babe5-241679.jpg"
              className="sm:w-36 md:w-72"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div>
              <h3 className="md:text-3xl sm:text-lg">
                ইংলিশে দুর্বলদের জন্য VOCAB THERAPY (হার্ডকভার)
              </h3>
              <h6 className="lg:text-xl text-sm py-5">by সাইফুল ইসলাম</h6>
              <div>
                <div className="rating lg:rating-lg sm:rating-sm">
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                    checked
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                  />
                </div>
              </div>
              <button className="my-3 lg:my-5 btn btn-xs md:btn-md text-sm border-none bg-white hover:bg-cyan-600">
                <Link to="/books">All books</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle btn-sm md:btn-md">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle btn-sm md:btn-md">
            ❯
          </a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full text-white">
        <div className="grid grid-cols-2 mx-auto space-x-2">
          <div className="flex justify-center">
            <img
              src="https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/FMS_Necessary_Vocabulary_With_Standard_P-Mohammed_Feroz_Mukul_FM-540c1-109994.jpg"
              className="sm:w-36 md:w-72"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div>
              <h3 className="md:text-3xl sm:text-lg">
                এফএম'এস নেসেসারি ভোকাবুলারি উইথ স্ট্যান্ডার্ড প্রোনানসিয়েশন
                (পেপারব্যাক)
              </h3>
              <h6 className="lg:text-xl text-sm py-5">
                by মোহাম্মদ ফিরোজ মুকুল (এফএম)
              </h6>
              <div>
                <div className="rating lg:rating-lg sm:rating-sm">
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                    checked
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-orange-400"
                  />
                </div>
              </div>
              <button className="my-3 lg:my-5 btn btn-xs md:btn-md text-sm border-none bg-white hover:bg-cyan-600">
                <Link to="/books">All books</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle btn-sm md:btn-md">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle btn-sm md:btn-md">
            ❯
          </a>
        </div>
      </div>
    </section>
  );
}
