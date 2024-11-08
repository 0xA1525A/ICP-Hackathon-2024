export const Navbar = ()=>{
  return (
			<div className="flex items-center justify-between mb-5">
				<h1 className="font-bold text-2xl gap-1 flex items-center">
					<span className="bg-primary text-white aspect-square w-8 rounded-xl flex items-center justify-center font-extrabold">
						D
					</span>
					Coin
				</h1>
				<div className="flex items-center gap-2">
					<div className="flex w-10 aspect-square bg-gray-300 rounded-full" />
				</div>
			</div>
		);
}