<?php

namespace App\Models\GestionOrdenes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ordenes extends Model
{
    use HasFactory;

    protected $table = "ordenservicio";

    protected $primaryKey = "id_otr";

    protected $fillable = [
        'estado_otr',
        'tipo_otr',
        'concepto_otr',
        'fechaprogramada_otr',
        'fechainicia_otr',
        'fechafinal_otr',
        'diasoperacion_otr',
        'equipo_otr',
        'proveedor_otr',
        'cliente_otr',
        'operario_otr',
        'grupoequipo_otr',
        'subgrupoequipo_otr',
        'ciudad_otr',
        'resumenorden_otr',
        'prioridad_otr',
        'empresa_otr'
    ];

    public $timestamps = false;
}
