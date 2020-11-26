<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasFactory;

    protected $table = "empresa";

    protected $primaryKey = "id_emp";

    protected $fillable = [
        'nombre_emp',
        'nit_emp',
        'digitochequeo_emp',
        'direccion_emp',
        'fecha_creacion_emp',
        'fecha_modificación_emp',
        'ciudad_emp',
        'pais_emp'
    ];
  
    public function pais(){
        return $this->belongsTo("App\Models\Paises","pais_emp");
    }

    public $timestamps = false;
}