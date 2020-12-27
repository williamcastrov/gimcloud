<?php

namespace App\Models\Mantenimiento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubGruposEquipos extends Model
{
    use HasFactory;

    protected $table = "subgruposequipos";

    protected $primaryKey = "id_sgre";

    protected $fillable = [
        'codigo_sgre',
        'grupo_sgre',
        'descripcion_sgre',  
        'empresa_sgre',
        'estado_sgre',
    ];

    public $timestamps = false;
}
