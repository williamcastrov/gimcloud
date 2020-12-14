<?php

namespace App\Models\Activos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Areas extends Model
{
    use HasFactory;

    protected $table = "areas";

    protected $primaryKey = "id_are";

    protected $fillable = [
        'codigo_are',
        'nombre_are',
        'empresa_are',
        'estado_are',
    ];

    public $timestamps = false;
}
