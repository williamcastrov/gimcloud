<?php

namespace App\Models\Interlocutores;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoInterlocutores extends Model
{
    use HasFactory;

    protected $table = "tipo_interlocutor";

    protected $primaryKey = "id_tint";

    protected $fillable = [
        'codigo_tint',
        'nombre_tint',
        'empresa_tint'
    ];

    public function empresa(){
        return $this->belongsTo("App\Models\Parameters\Empresa","empresa_tint");
    }

    public $timestamps = false;
}
