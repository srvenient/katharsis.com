import { Poppins } from "next/font/google";

const poppins = Poppins({
	weight: ['300', '400', '600', '800'],
	style: ['normal', 'italic'],
	display: 'swap'
})

export default function Home() {
	return (
		<div
			id="lading"
			className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start"
		>
			<main className="flex flex-col items-center justify-center w-full flex-1 px-20">
				<div className="flex flex-col items-start text-start pt-32 w-2xl">
					<h1 className={`${poppins.className} text-7xl font-medium`}>
						Katharsis
					</h1>
					<p className={`font-family-special text-sm pt-1`}>
						Del caos al orden en un solo click
					</p>
					<p className="pt-6">
						Optimiza la gestión de tu negocio con nuestro Sistema de Gestión de Inventarios para Pequeñas Empresas. Controla tu inventario de forma eficiente, reduce costos y mejora la productividad.
					</p>
				</div>
			</main>
		</div>
	);
}
