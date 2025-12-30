import Logo from "@/components/shared/Logo";

const Loading = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="p-6 flex items-center flex-col gap-2 animate-pulse">
        <Logo className="h-20 w-20" />

        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
