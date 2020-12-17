<?php

namespace App\Models\Mantenimiento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tiposmtto extends Model
{
    use HasFactory;

    protected $table = "tiposmantenimiento";

    protected $primaryKey = "id_tmt";

    protected $fillable = [
        'codigo_tmt',
        'nombre_tmt',
        'empresa_tmt'
    ];

    public function empresa(){
        return $this->belongsTo("App\Models\Parameters\Empresa","empresa_tmt");
    }

    public $timestamps = false;
}
