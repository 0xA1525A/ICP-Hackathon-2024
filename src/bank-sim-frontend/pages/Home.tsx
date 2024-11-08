import { navbarIcons } from "@/pages";

export default function Home() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl gap-1 flex items-center">
          <span className="bg-primary text-white aspect-square w-8 rounded-xl flex items-center justify-center font-extrabold">
            D
          </span>
          Coin
        </h1>
        <div className="flex items-center gap-2">
          <div className="flex w-10 aspect-square bg-gray-300 rounded-full"></div>
        </div>
      </div>
      <div className="absolute bottom-3  h-20 max-w-sm w-full left-1/2 -translate-x-1/2 px-3">
        <div className="bg-primary rounded-2xl w-full">
          <div className="flex items-center gap-4 justify-between h-full text-white px-2 py-2">
            {navbarIcons.map((v, i) => i === 2 ? (
              <div
                className="w-full grow relative"
                key={`${v.icon.displayName}_${v.name}_Name`}
              >
                <div className="bg-white aspect-square grow flex items-center justify-center rounded-full w-20 text-primary border-4 border-primary absolute left-1/2 -top-14 -translate-x-1/2 transition-all hover:bg-primary hover:text-white">
                  {<v.icon className="size-9" />}
                </div>
                <p className="text-center text-xs font-bold mt-7">
                  {v.name}
                </p>
              </div>
            ) : (
              <div
                key={`${v.name}_Name`}
                className="w-full grow  aspect-square flex flex-col font-bold text-xxs items-center justify-center rounded-xl hover:bg-black/20 transition-all"
              >
                {<v.icon className="size-7" />}
                <span className="mt-1">{v.name}</span>
              </div>
            )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
