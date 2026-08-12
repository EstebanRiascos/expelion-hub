"use client";

import {
  FileText,
  Download,
  FileCode2,
  Image,
  FileArchive,
} from "lucide-react";

import { motion } from "framer-motion";


const files = [
  {
    name: "Documento de requerimientos.pdf",
    type: "PDF",
    size: "2.4 MB",
    date: "Actualizado hoy",
    icon: FileText,
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Diseño interfaz portal.fig",
    type: "Diseño",
    size: "18 MB",
    date: "Actualizado ayer",
    icon: Image,
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Código fuente proyecto.zip",
    type: "Archivo",
    size: "45 MB",
    date: "Hace 3 días",
    icon: FileArchive,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    name: "Documentación técnica.docx",
    type: "Documento",
    size: "1.8 MB",
    date: "Hace una semana",
    icon: FileCode2,
    color: "bg-blue-100 text-blue-600",
  },
];



export default function FilesPage(){


return (

<div className="space-y-8">



{/* Header */}

<div>


<h1 className="text-3xl font-bold text-neutral-900">
Archivos
</h1>


<p className="mt-2 text-neutral-600">
Consulta y descarga documentos relacionados con tu proyecto.
</p>


</div>






{/* Contenedor */}

<div
className="
rounded-[32px]
border
border-neutral-200
bg-white
p-8
"
>


<div className="grid gap-5">


{files.map((file,index)=>{


const Icon=file.icon;


return (

<motion.div

key={file.name}

initial={{
opacity:0,
y:20,
}}

whileInView={{
opacity:1,
y:0,
}}

viewport={{
once:true,
}}

transition={{
duration:.4,
delay:index*.1,
}}

className="
flex
flex-col
gap-5
rounded-2xl
border
border-neutral-200
p-5
transition
hover:shadow-lg
md:flex-row
md:items-center
md:justify-between
"

>



<div className="flex items-center gap-4">


<div
className={`
flex
h-12
w-12
items-center
justify-center
rounded-xl
${file.color}
`}
>

<Icon size={24}/>

</div>



<div>

<h3 className="font-semibold text-neutral-900">

{file.name}

</h3>


<div className="mt-1 flex gap-3 text-sm text-neutral-500">

<span>
{file.type}
</span>

<span>
•
</span>

<span>
{file.size}
</span>

<span>
•
</span>

<span>
{file.date}
</span>


</div>


</div>


</div>







<button
className="
inline-flex
items-center
justify-center
gap-2
rounded-xl
border
border-neutral-200
px-4
py-2
text-sm
font-medium
text-neutral-700
transition
hover:bg-neutral-100
"
>


<Download size={17}/>

Descargar


</button>





</motion.div>


);


})}


</div>


</div>





</div>

);


}