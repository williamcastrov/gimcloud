<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ciudades extends Model
{
    use HasFactory;

    protected $table = "ciudades";

    protected $primaryKey = "id_ciu";

    protected $fillable = [
        'codigo_ciu',
        'nombre_ciu',
        'departamento_ciu'
    ];

    public function departamento(){
        return $this->belongsTo("App\Models\Departamentos","departamento_ciu");
    }

    public $timestamps = false;
}
