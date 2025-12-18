import { config } from "@/utils/config";

const Hero = () => {
  return (
    <div className="w-full px-4 py-5">
      <div className="">
        <div className="">
          <div
            className="flex min-h-[560px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 rounded-xl items-center justify-center p-8 relative overflow-hidden"
            data-alt="Warm and welcoming diverse church congregation worshipping with raised hands in soft lighting"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBDhiJNrdpS8BBH9hwmQoKtF2qAELpfel-II4_fqMtKeJ9iJUxdF4tL_pqV7v3VZ_tpvSxLN4PhhK6waMnzWqh5u-X8qK3tEdYMRMUAS_7d13wtg-nNQ4dYvifSG3yWyALotP0JVi99EUM_kwY6EnFb2uLzGVh97N35XaiVu1oQhbmrWuMqHAf94eOn09rnFf5Pl3sCKXOCr9zzKQBRqpjAkQQQMZ2JdSI-uPc6417_bwmEk9Kc1OzGCd7o7PKa1WvZqVJ2wFwz6mvk')",
            }}
          >
            <div className="flex flex-col gap-4 text-center z-10 max-w-3xl">
              <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em] drop-shadow-md">
                Welcome Home to {" "}
                {config.SITE_NAME}
              </h1>
              <h2 className="text-white/90 text-lg font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
                Connect, grow, and experience God’s power in a community that
                cares. Your spiritual journey starts here.
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 z-10 mt-4">
              <button className="flex min-w-40 cursor-pointer items-center justify-center rounded-full h-12 px-6 bg-primary hover:bg-blue-600 text-white text-base font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                <span>Join Our Community</span>
              </button>
              <button className="flex min-w-40 cursor-pointer items-center justify-center rounded-full h-12 px-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-base font-bold transition-all border border-white/40">
                <span>Plan a Visit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
