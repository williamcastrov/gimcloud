<?php

namespace App\Models\Parameters;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estados extends Model
{
    use HasFactory;

    protected $table = "estados";

    protected $primaryKey = "id_est";

    protected $fillable = [
        'codigo_est',
        'nombre_est',
        'empresa_est'
    ];

    public function empresa(){
        return $this->belongsTo("App\Models\Parameters\Empresa","empresa_est");
    }

    public $timestamps = false;

}
