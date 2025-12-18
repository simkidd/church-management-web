const WelcomeMessage = () => {
  return (
    <section className="w-full container mx-auto px-4 py-12">
      <div className="">
        <div className="flex flex-col gap-8 py-6 md:py-10 md:flex-row items-center">
          <div
            className="w-full md:w-1/2 bg-center bg-no-repeat aspect-4/3 bg-cover rounded-2xl shadow-xl"
            data-alt="Pastor speaking warmly to the congregation with soft stage lighting"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCm1WXWqaBuKXvQkL27xPoL5riEz48RymemKpoocAA-JG4ndKU6oHCRbiyp4Kg02pLAe6ppkJnCJ2tu_EmMRrQim7aPE3twonO3mGnzs2xPxeFot6Dqnw469M7TssWe8I9M8jVTeoHC8rtJPPqDm5iziCUw-pk0pixUBB9H-mAHAsx6cQDI1ENIFDO9_XXVwrsgKtesFk49F4a7KNuMw8SN5DzKUemKob8OJIIeeNY6t2mXxqLuTnhOL00N5Bug87ls2ummb91AS7xq')",
            }}
          ></div>
          <div className="w-full md:w-1/2 flex flex-col gap-6 md:pl-10">
            <div className="flex flex-col gap-3 text-left">
              <div className="flex items-center gap-2 text-primary dark:text-primary-light font-bold uppercase tracking-wider text-sm">
                <span className="w-8 h-0.5 bg-primary dark:bg-primary-light"></span>
                Leadership
              </div>
              <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-[-0.02em]">
                A Message from Our Pastors
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg font-normal leading-relaxed mt-2">
                &quot;We are dedicated to helping you discover your purpose and
                walk in dominion. Join us as we raise leaders that transform
                society through the power of the Gospel.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeMessage;
