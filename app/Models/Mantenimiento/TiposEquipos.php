<?php

namespace App\Models\Mantenimiento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TiposEquipos extends Model
{
    use HasFactory;

    protected $table = "tiposequipos";

    protected $primaryKey = "id_tequ";

    protected $fillable = [
        'codigo_tequ',
        'empresa_tequ',
        'nombre_tequ',  
        'estado_tequ',
    ];

    public $timestamps = false;
}
