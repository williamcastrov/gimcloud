<?php

namespace App\Models\DatosEquipos;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contratos extends Model
{
    use HasFactory;

    protected $table = "contratos";

    protected $primaryKey = "id_ctr";

    protected $fillable = [
        'codigocontrato_ctr',
        'cliente_ctr',
        'asesorcomercial_ctr',
        'duracion_ctr',
        'fechainicio_ctr',
        'fechafinal_ctr',
        'ciudad_ctr',
        'valorcontrato_ctr',
        'estado_ctr',
        'observacion_ctr'
    ];

    public $timestamps = false;
}
