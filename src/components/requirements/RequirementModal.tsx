"use client";

import {
  X,
  Upload,
} from "lucide-react";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";



interface RequirementModalProps {

  open:boolean;

  onClose:()=>void;

  onSubmit:(data:{
    title:string;
    description:string;
    priority:string;
    status:string;
  })=>void;


  editingData?:{
    title:string;
    description:string;
    priority:string;
    status:string;
  } | null;

}





export default function RequirementModal({

  open,

  onClose,

  onSubmit,

  editingData,

}:RequirementModalProps){



const [title,setTitle] = useState("");

const [description,setDescription] = useState("");

const [priority,setPriority] = useState("Normal");





// eslint-disable-next-line react-hooks/exhaustive-deps
// eslint-disable-next-line react-hooks/set-state-in-effect
useEffect(()=>{


if(editingData){

setTitle(editingData.title);

setDescription(editingData.description);

setPriority(editingData.priority);


}

else{

setTitle("");

setDescription("");

setPriority("Normal");


}



},[editingData,open]);








function handleClose(){


setTitle("");

setDescription("");

setPriority("Normal");


onClose();


}








function handleSubmit(){



onSubmit({

title,

description,

priority,

status:
editingData?.status ?? "Pendiente",


});



handleClose();


}







if(!open) return null;






return (

<motion.div

initial={{
opacity:0,
}}

animate={{
opacity:1,
}}

onClick={handleClose}

className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/40
px-4
"

>





<motion.div

initial={{
scale:0.95,
y:20,
}}

animate={{
scale:1,
y:0,
}}

onClick={(e)=>e.stopPropagation()}

className="
w-full
max-w-xl
rounded-3xl
bg-white
p-8
shadow-2xl
"

>





<div
className="
flex
items-center
justify-between
"
>


<h2
className="
text-xl
font-semibold
text-neutral-900
"
>

{
editingData
?
"Editar requerimiento"
:
"Nuevo requerimiento"
}


</h2>




<button

onClick={handleClose}

className="
rounded-lg
p-2
hover:bg-neutral-100
"

>

<X size={20}/>

</button>


</div>









<div
className="
mt-6
space-y-5
"
>




<div>

<label className="text-sm font-medium">

Título

</label>



<input

value={title}

onChange={(e)=>setTitle(e.target.value)}

placeholder="Ej: Crear módulo de reportes"

className="
mt-2
w-full
rounded-xl
border
border-neutral-200
px-4
py-3
outline-none
focus:border-violet-500
"

/>


</div>









<div>

<label className="text-sm font-medium">

Descripción

</label>



<textarea

value={description}

onChange={(e)=>setDescription(e.target.value)}

rows={4}

placeholder="Describe la solicitud"

className="
mt-2
w-full
rounded-xl
border
border-neutral-200
px-4
py-3
outline-none
focus:border-violet-500
"

/>


</div>









<div>


<label className="text-sm font-medium">

Prioridad

</label>



<select

value={priority}

onChange={(e)=>setPriority(e.target.value)}

className="
mt-2
w-full
rounded-xl
border
border-neutral-200
px-4
py-3
"

>


<option>

Normal

</option>


<option>

Alta

</option>


<option>

Urgente

</option>



</select>



</div>









<div

className="
rounded-xl
border
border-dashed
border-neutral-300
p-5
"

>


<div

className="
flex
items-center
gap-3
text-neutral-600
"

>


<Upload size={20}/>


<span className="text-sm">

Adjuntar archivo

</span>



</div>



</div>









<button

onClick={handleSubmit}

disabled={!title || !description}

className="
w-full
rounded-xl
bg-violet-600
py-3
font-semibold
text-white
transition
hover:bg-violet-700
disabled:opacity-50
"

>


{
editingData
?
"Guardar cambios"
:
"Enviar requerimiento"
}



</button>





</div>







</motion.div>





</motion.div>


);


}