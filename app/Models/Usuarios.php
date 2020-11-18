<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuarios extends Model
{
    use HasFactory;

    protected $table = "usuarios";

    protected $primaryKey = "id";

    protected $fillable = [
        'nit',
	    'nombre',
	    'company',
	    'email',
	    'telefono',
	    'pais',
	    'ciudad',
	    'uid',
	    'tipo', 
	    'foto',
	    'celular', 
	    'direccion', 
	    'activo'
    ];

    public $timestamps = false;
}

