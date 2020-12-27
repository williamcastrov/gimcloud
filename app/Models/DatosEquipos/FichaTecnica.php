<?php

namespace App\Models\DatosEquipos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FichaTecnica extends Model
{
    use HasFactory;

    protected $table = "fichatecnica";

    protected $primaryKey = "id_fit";

    protected $fillable = [
        'peso_fit',
	    'dimensiones_fit',
	    'codigoinventario_fit',
	    'capacidad_fit',
	    'alturamaximaelevacion_fit',
	    'alturamastilcolapsado_fit',
	    'horquillas_fit',
	    'centrodecarga_fit',
	    'tipodeoperacion_fit',
	    'separacionbrazos_fit',
	    'alturabrazos_fit',
	    'sideshift_fit',
	    'bateriatraccion_fit',
	    'cargador_fit',
	    'medidacofrebateria_fit',
		'tipoderuedafrontal_fit',
		'tipoderuedatrasera_fit',
		'tipoderuedadegiro_fit',
	    'proveedor_fit',
	    'denominacion_fit',
	    'numerofabricante_fit'
    ];

    public $timestamps = false;
}
