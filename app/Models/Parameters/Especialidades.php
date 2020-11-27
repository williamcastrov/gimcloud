<?php

namespace App\Models\Parameters;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Especialidades extends Model
{
    use HasFactory;

    protected $table = "especialidades_int";

    protected $primaryKey = "id_esp";

    protected $fillable = [
        'codigo_esp',
        'nombre_esp',
        'empresa_esp',
        'estado_esp'
    ];

    public function empresa(){
        return $this->belongsTo("App\Models\Parameters\Empresa","empresa_esp");
    }

    public $timestamps = false;
}
