import React from "react";
import {PackageCheck} from "lucide-react";
import Link from "next/link";

export default function SignUpForm() {
  return (
    <div className="flex h-full items-center justify-center font-primary mt-52">
      <div className="border border-gray-900 bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <PackageCheck size={64} strokeWidth={1.25} className="mx-auto h-12 w-aut text-midnight-black"/>
          <h2 className="font-bold text-center text-2xl text-gray-900 tracking-tight ">Crea tu cuenta</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <ul className="flex flex-col gap-4">
              <li className="flex flex-col items-start gap-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Nombre</label>
                <input
                  className="w-full px-3.5 py-2.5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  placeholder="Juan Pérez"
                  type="text"
                />
              </li>
              <li className="flex flex-col items-start gap-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">Correo electrónico</label>
                <input
                  className="w-full px-3.5 py-2.5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  placeholder="example@tudominio.com"
                  type="email"
                />
              </li>
              <li className="flex flex-col items-start gap-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">Contraseña</label>
                <input
                  className="w-full px-3.5 py-2.5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  placeholder="********"
                  type="password"
                />
              </li>
            </ul>
            <div className="flex items-center justify-center">
              <button
                type={"submit"}
                className="flex justify-center rounded-md bg-gray-600 px-8 py-2.5 text-sm font-semibold text-white shadow hover:bg-gray-900 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Registrarse
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/auth/sign-in" className="font-semibold text-gray-600 hover:text-gray-900">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  )
}