"use client";

import {
  Send,
  User,
  MessageCircle,
} from "lucide-react";

import { motion } from "framer-motion";


const messages = [
  {
    author: "Equipo EXPELION",
    role: "Desarrollo",
    message:
      "Hemos finalizado el módulo de inventario. Puedes revisar los cambios en la sección de requerimientos.",
    time:
      "Hoy · 10:30 AM",
    type:
      "team",
  },
  {
    author: "Empresa cliente",
    role: "Cliente",
    message:
      "Excelente, necesitamos agregar un filtro adicional para las categorías.",
    time:
      "Hoy · 11:15 AM",
    type:
      "client",
  },
  {
    author: "Equipo EXPELION",
    role: "Desarrollo",
    message:
      "Perfecto, agregaremos este ajuste dentro del siguiente ciclo de desarrollo.",
    time:
      "Hoy · 12:00 PM",
    type:
      "team",
  },
];



export default function CommentsPage(){


return (

<div className="space-y-8">



{/* Header */}

<div>


<h1 className="text-3xl font-bold text-neutral-900">
Comentarios
</h1>


<p className="mt-2 text-neutral-600">
Comunícate con el equipo de desarrollo y realiza seguimiento del proyecto.
</p>


</div>






{/* Chat */}

<div
className="
rounded-[32px]
border
border-neutral-200
bg-white
p-8
"
>


<div className="mb-8 flex items-center gap-3">


<div
className="
flex
h-11
w-11
items-center
justify-center
rounded-xl
bg-violet-100
text-violet-700
"
>

<MessageCircle size={22}/>

</div>


<div>

<h2 className="font-semibold text-neutral-900">
Conversación del proyecto
</h2>

<p className="text-sm text-neutral-500">
Sistema ERP Empresarial
</p>

</div>


</div>






<div className="space-y-5">



{messages.map((message,index)=>{


const isClient =
message.type === "client";


return (

<motion.div

key={index}

initial={{
opacity:0,
y:15,
}}

whileInView={{
opacity:1,
y:0,
}}

viewport={{
once:true,
}}

transition={{
duration:.3,
}}

className={`
flex
${isClient ? "justify-end" : "justify-start"}
`}

>



<div
className={`
max-w-xl
rounded-3xl
p-5
${
isClient
?
"bg-violet-600 text-white"
:
"bg-neutral-100 text-neutral-900"
}
`}
>


<div className="flex items-center gap-2">


<div
className={`
flex
h-8
w-8
items-center
justify-center
rounded-full
${
isClient
?
"bg-white/20"
:
"bg-white"
}
`}
>

<User size={16}/>

</div>


<div>


<p className="text-sm font-semibold">
{message.author}
</p>


<p
className={`
text-xs
${
isClient
?
"text-violet-100"
:
"text-neutral-500"
}
`}
>

{message.role}

</p>


</div>


</div>





<p className="mt-4 leading-7">
{message.message}
</p>



<p
className={`
mt-3
text-xs
${
isClient
?
"text-violet-100"
:
"text-neutral-500"
}
`}
>

{message.time}

</p>


</div>



</motion.div>


);


})}



</div>






{/* Input */}

<div
className="
mt-8
flex
gap-3
border-t
border-neutral-200
pt-6
"
>


<input

placeholder="Escribe un comentario..."

className="
flex-1
rounded-xl
border
border-neutral-200
px-4
py-3
outline-none
transition
focus:border-violet-500
"

/>



<button

className="
flex
items-center
gap-2
rounded-xl
bg-neutral-900
px-5
font-medium
text-white
transition
hover:bg-neutral-800
"

>


Enviar

<Send size={17}/>


</button>



</div>





</div>





</div>

);


}