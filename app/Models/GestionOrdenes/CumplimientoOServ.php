<?php

namespace App\Models\GestionOrdenes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CumplimientoOServ extends Model
{
    use HasFactory;

    protected $table = "cumplimientooserv";

    protected $primaryKey = "id";

    protected $fillable = [
        'id_cosv',
		'descripcion_cosv',
		'tipooperacion_cosv',
	    'referencia_cosv',
	    'fechainicia_cosv',
	    'fechafinal_cosv',
	    'horainiciacosv',
	    'horafinal_cosv',
	    'cantidad_cosv',
	    'valorunitario_cosv',
	    'valortotal_cosv',
	    'servicio_cosv',
	    'observacion_cosv'
    ];

    public $timestamps = false;
}
