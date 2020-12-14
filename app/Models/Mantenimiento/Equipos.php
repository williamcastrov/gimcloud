<?php

namespace App\Models\Mantenimiento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipos extends Model
{
    use HasFactory;

    protected $table = "equipos";

    protected $primaryKey = "id_equ";

    protected $fillable = [
        'codigo_equ',
        'empresa_equ',
        'nombre_equ',
        'grupo_equ',
        'subgrupo_equ',
        'frecuencia_equ',
        'estado_equ',
        'propietario_equ',
        'marca_equ',
        'modelo_equ',
        'antiguedad_equ',
        'tipoequipo_equ',
        'serie_equ',
        'fechacreacion_equ',
        'fechamodificacion_equ',
        'direccion_equ',
        'valoradquisicion',
        'tipomoneda_equ',
        'clasificacionABC_equ',
        'centrodecosto_equ',
        'fechainiciagarantia_equ',
        'fechafingarantia_equ',
    ];

    public $timestamps = false;
}
