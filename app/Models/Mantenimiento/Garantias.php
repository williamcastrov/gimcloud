<?php

namespace App\Models\Mantenimiento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Garantias extends Model
{
    use HasFactory;

    protected $table = "garantias";

    protected $primaryKey = "id_gar";

    protected $fillable = [
        "equipo_gar",
        'idgarantia_gar',
        'empresa_gar',
        'fechainicial_gar',
        'fechafinal_gar',
        'estado_gar',
        'observacion_gar'
    ];

    public $timestamps = false;
}
