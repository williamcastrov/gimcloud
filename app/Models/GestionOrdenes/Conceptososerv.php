<?php

namespace App\Models\GestionOrdenes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conceptososerv extends Model
{
    use HasFactory;

    protected $table = "conceptooserv";

    protected $primaryKey = "id_con";

    protected $fillable = [
        'descripcion_con',
        'empresa_con',
        'estado_con'
    ];

    public $timestamps = false;
}
