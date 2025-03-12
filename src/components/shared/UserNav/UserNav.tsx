"use client"

// Importamos los componentes necesarios de shadcn/ui
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



const UserNav = () => {
  return (
    <DropdownMenu>
      {/* Botón que activa el menú desplegable */}
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      {/* Contenido del menú desplegable */}
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {/* Información del usuario */}
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-medium leading-none">Javier Alemán</p>
          <p className="text-xs leading-none text-muted-foreground">javier.aleman@gmail.com</p>
        </div>
        <DropdownMenuSeparator />

        {/* Opciones del menú con atajos de teclado */}
        <DropdownMenuItem className="flex justify-between cursor-pointer">
          Perfil
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-between cursor-pointer">
          Mis Compras
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-between cursor-pointer">
          Configuración
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-between cursor-pointer">
          Ayuda
        </DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


export default UserNav;