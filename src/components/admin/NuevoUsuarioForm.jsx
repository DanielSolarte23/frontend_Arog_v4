"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { useUsuario } from "@/context/UsuarioContext";

function NuevoUsuarioForm() {
  const { usuarios, getUsuarios, updateUsuario, deleteUsuario, getUsuario } =
    useUsuario();

    const {register, handleSubmit, control, reset, watch} = useForm({
        defaultValues:{
            nombres: "",
            apellidos:"",
            correoElectronico:"",
            contraseña:"",
            telefono:"",
            rol:"ciudadano"
        }
    });

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            // const 
        } catch (error) {
            
        }
    }

  return <div>NuevoUsuarioForm</div>;
}

export default NuevoUsuarioForm;
