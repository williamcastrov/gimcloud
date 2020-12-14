<?php

namespace App\Models\Parameters;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Monedas extends Model
{
    use HasFactory;

    protected $table = "monedas";

    protected $primaryKey = "id_mon";

    protected $fillable = [
        'codigo_mon',
        'nombre_mon',
        'empresa_mon',
        'estado_mon',
    ];

    public $timestamps = false;
}
